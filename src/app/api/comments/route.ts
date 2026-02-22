import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { JWTPayload } from "@/utils/types";
import { CreateCommentDto } from "@/utils/dtos";
import { CreateCommentSchema } from "@/utils/validationSchemas";
import prisma from "@/utils/prisma"
import { Comment } from "@/generated/prisma/client";
import { verifyToken } from "@/utils/verifyToken";

/**
    * @method POST
    * @route  ~/api/comments
    * @desc   Create New Comment
    * @access private(only logged In user) = Have token..
*/

export async function POST(request: NextRequest) {
    try {
        // Check for the existence of the token in Request " user logged in" ..in Middleware File ..

        // Token Existence => I can verify Token to get jwtPayload:


        // لمعرفة الشخص الذي أنشأ التعليق => 
        //I need Id from userPayload for : UserId in Comment Table. 

        const userFromToken: JWTPayload | null = verifyToken(request);

        /* ممكن استخدام هذا الرد ايضا .. المهم مراعاة حالة فشل التحقق من التوكن
        if (!userFromToken) {
            return NextResponse.json(
                { message: "Unauthorized: invalid or missing token" },
                { status: 401 }
            );
        */

        if (userFromToken !== null) {
            // create:
            const body = (await request.json()) as CreateCommentDto;
            const validation = CreateCommentSchema.safeParse(body);
            if (!validation.success) {
                return NextResponse.json({ message: validation.error.issues[0].message })
            }

            const newComment: Comment = await prisma.comment.create({
                data: {
                    text: body.text,
                    articleId: body.articleId,
                    userId: userFromToken.id
                }
            });
            return NextResponse.json(newComment, { status: 201 });
        }

        return NextResponse.json(
            { message: "Only Logged In User , Access Denied , Un Authorize" },
            { status: 401 }
        );

    } catch (error) {
        return NextResponse.json(
            { messsge: "Intenal server error" },
            { status: 500 }
        )
    }

}

/**
    * @method GET
    * @route  ~/api/comments
    * @desc   GET All Comments
    * @access private(only Admin user) = Have token + admin..
*/

export async function GET(request: NextRequest) {
    try {
        // Check for the existence of the token in Request " user logged in" ..in Middleware File ..

        const userFromToken: JWTPayload | null = verifyToken(request);

        if (userFromToken !== null && userFromToken.isAdmin === true) {
            const comments = await prisma.comment.findMany();
            return NextResponse.json(
                comments,
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: "only Admin , Access Denied , forbiden" },
            { status: 403 }
        );

    } catch (error) {
        return NextResponse.json(
            { messsge: "Intenal server error" },
            { status: 500 }
        );
    }
}



