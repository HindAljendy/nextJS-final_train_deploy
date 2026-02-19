import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma"
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";


// Next.js API route handlers  : are functions that handle HTTP requests for API endpoints.
/**
    * @method POST
    * @route  ~/api/users/login
    * @desc   SignIn "LogIn user"
    * @access public
*/

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as LoginUserDto;

        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message }, { status: 400 }
            );
        }

        // Checking if a user's account is registered in the database : => Email
        const user = await prisma.user.findUnique({
            where: { email: body.email }
        });

        if (!user) {
            return NextResponse.json(
                { message: "You don't have an accout , Please create an account to be able to log in" },
                { status: 400 }
            );
        }

        // Check from body.password : 
        const isPasswordMatch = await bcrypt.compare(body.password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { message: "Invalid Password" },
                { status: 400 }
            );
        }
    
        // generate Token +  Store Token in Cookie :
        const cookie = setCookie({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        });


        return NextResponse.json({ messsge: "Authenticated" },
            {
                status: 200,
                headers: { "Set-Cookie": cookie }
            }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Intenal server error" },
            { status: 500 }
        )
    }
}