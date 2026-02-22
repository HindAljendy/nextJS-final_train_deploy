import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma"
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDto } from "@/utils/dtos";
import { UpdateCommentSchema } from "@/utils/validationSchemas";
import { JWTPayload } from "@/utils/types";


/**
    * @method PUT
    * @route  ~/api/comments:id
    * @desc   Update Single Comment
    * @access private(only owner of the comment) + Have token..
*/


interface Tprops {
    params: { id: string };
}

export async function PUT(request: NextRequest, { params }: Tprops) {
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!comment) {
            return NextResponse.json({ message: " comment not found " }, { status: 404 });
        }

        // Check for the existence of the token in Request " user logged in" ..in Middleware File .

        // Now : Authorization Step :
        const userFromToken: JWTPayload | null = verifyToken(request);

        // حالة الفشل 
        if (userFromToken === null || userFromToken.id !== comment.userId) {
            return NextResponse.json(
                { message: "you are not allowed , Access Denied , forbiden" }, // اي رد يعبر عن الحظر
                { status: 403 }
            );
        }

        // update :
        const body = (await request.json()) as UpdateCommentDto;
        const validation = UpdateCommentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0].message })
        }

        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(params.id) },
            data: {
                text: body.text
            }
        });

        return NextResponse.json(
            updatedComment,
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { messsge: "Intenal server error" },
            { status: 500 }
        )
    }
}

/**
    * @method DELETE
    * @route  ~/api/comments:id
    * @desc   Delete Single Comment
    * @access private(only  Admin OR owner of the comment) + Have token..
*/

export async function DELETE(request: NextRequest, { params }: Tprops) {
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(params.id) },
        });

        if (!comment) {
            return NextResponse.json({ message: " comment not found " }, { status: 404 });
        }

        // Check for the existence of the token in Request " user logged in" ..in Middleware File .

        // Now : Authorization Step :
        const userFromToken: JWTPayload | null = verifyToken(request);
        if (userFromToken === null) {
            return NextResponse.json(
                { message: 'no token provided, access denied' },
                { status: 401 }
            )
        }

        if (userFromToken.id === comment.userId || userFromToken.isAdmin) {
            // delete :
            await prisma.comment.delete({
                where: { id: parseInt(params.id) }
            });

            return NextResponse.json({ messsge: "comment deleted" }, { status: 200 });
        }

        return NextResponse.json(
            { message: 'you are not allowed, access denied' },
            { status: 403 }
        );

    } catch (error) {
        return NextResponse.json(
            { messsge: "Intenal server error" },
            { status: 500 }
        );
    }
}