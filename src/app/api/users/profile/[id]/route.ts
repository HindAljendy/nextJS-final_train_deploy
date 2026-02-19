import { UpdateUserDto } from '@/utils/dtos';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { JWTPayload } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
import { UserProfileUpdatedSchema } from '@/utils/validationSchemas';




/**
    * @method DELETE
    * @route  ~/api/users/profile:id
    * @desc   Delete Profile [delete single User]
    * @access private (only user himself can delete his account) = Restrict . "Request have token"
*/

interface Tprops {
    params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Tprops) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            include:{comments:true}
        });

        if (!user) {
            return NextResponse.json({ message: "user not found " }, { status: 404 });
        }

        // Get Token from header :
        //const token = request.headers.get("authToken") as String;

        // Get Token from cookies :
        /*      
        const jwtToken = request.cookies.get('jwtToken');
        const token = jwtToken?.value as string;  */

        // Check for the existence of the token in Request " user logged in" ..in Middleware File ..

        /*  if (!authToken) {
            return NextResponse.json(
                { message: "no token provided , Un Authorize" },
                { status: 401 }
            );
        } */

        const userFromToken = verifyToken(request);

        if (userFromToken !== null && userFromToken.id === user.id) {
            // delete user
            await prisma.user.delete({
                where: { id: parseInt(params.id) }
            });

            // delete the comments that belong to this user
            const commentsIds : number[] = user?.comments.map(comment=>comment.id);
            await prisma.comment.deleteMany({
                where : {id : {in : commentsIds}}
            });

            return NextResponse.json(
                { message: "your profile (account) has been deleted " },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: "only user himself can delete his profile, Access Denied , forbiden" },
            { status: 403 }
        );

    } catch (error) {
        //console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }
}


/**
    * @method GET
    * @route  ~/api/users/profile:id
    * @desc   Get single User Profile By Id 
    * @access private (only user himself can get his account) = Restrict . "Request have token"
*/

export async function GET(request: NextRequest, { params }: Tprops) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!user) {
            return NextResponse.json({ message: "user not found " }, { status: 404 });
        }


        const userFromToken = verifyToken(request);

        if (userFromToken !== null && userFromToken.id === user.id) {
            return NextResponse.json(user,
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: "only user himself can get his profile, you are not allowed , Access Denied , forbiden" },
            { status: 403 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }
}

/**
    * @method PUT
    * @route  ~/api/users/profile:id
    * @desc   Update single User Profile By Id 
    * @access private (only user himself can update his account) = Restrict . "Request have token"
*/

export async function PUT(request: NextRequest, { params }: Tprops) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!user) {
            return NextResponse.json({ message: "user not found " }, { status: 404 });
        }

        const userFromToken = verifyToken(request);

        // حالة الفشل من تحقق التوكن
        if (userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json(
                { message: "only user himself can get his profile, you are not allowed , Access Denied , forbiden" },
                { status: 403 }
            );
        }

        // update :
        const body = (await request.json()) as UpdateUserDto;

        const validation = UserProfileUpdatedSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0].message })
        }


        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);

            /*  بدلا من validate 
            if (body.password.length < 6 ){
                return NextResponse.json(
                    { message: "Invalid Password , should be  minimum 6 characters" },
                    { status: 400 }
                );
            } */
        }

        if (body.email) {
            const user_email = await prisma.user.findUnique({
                where: { email: body.email }
            });

            //  + Make sure the email does't belong to the same user :
            if (user_email && user_email.id !== parseInt(params.id)) {
                return NextResponse.json(
                    { message: "Invalid Email , This Email already registered (existence) " },
                    { status: 400 }
                );
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(params.id) },
            data: {
                username: body.username,
                email: body.email,
                password: body.password
            }
        });

        //  Defining the properties that are displayed to the user:
        const {password  ,  ...others} = updatedUser;

        return NextResponse.json(
            { ...others, message: "Updated user Successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }

}