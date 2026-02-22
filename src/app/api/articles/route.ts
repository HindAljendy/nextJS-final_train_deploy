import { CreateNewArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@/generated/prisma/client";

import prisma from "@/utils/prisma"
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { JWTPayload } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
/* 
prisma.article
prisma.user
*/

/* Route Handler ( Function Handle HTTP Request ) */

/* Get All Articles:
/**
    * @method GET
    * @route  ~/api/articles
    * @desc   Get All Articles
    * @access public

export async function GET(request: NextRequest) {
    try {
        const articles = await prisma.article.findMany();
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }
}

*/

/**
    * @method GET
    * @route  ~/api/articles
    * @desc   Get Articles By page number
    * @access public (anyone who opens the website , can see all articles)
*/

// const ARTICLE_PER_PAGE = 6;

export async function GET(request: NextRequest) {
    try {
        // get pageNumber from request : => {{DOMAIN}}/api/articles?pageNumber=1
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
        //console.log(pageNumber);

        const articles = await prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
            take: ARTICLE_PER_PAGE,
            
            orderBy : {createdAt :'desc'}
        });

        return NextResponse.json(articles, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }
}

/**
    * @method POST
    * @route  ~/api/articles
    * @desc   Greate New Article
    * @access private(only admin can create article)
*/


export async function POST(request: NextRequest) {
    try {
        // Check for the existence of the token in Request " user logged in" ..in Middleware File .

        // Now : Authorization Step :
        const userFromToken: JWTPayload | null = verifyToken(request);

        // حالة الفشل 
        if (userFromToken === null || userFromToken.isAdmin === false) {
            return NextResponse.json(
                { message: 'only admin, access denied' },
                { status: 403 }
            );
        }

        // create :
        const body = (await request.json()) as CreateNewArticleDto;
        console.log({ body });

        /* Zod validation library : */

        const validation = createArticleSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
        }


        /* create new article in articles table in DB */
        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description
            }
        })
        return NextResponse.json({ newArticle, message: 'craeted Successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }
}
