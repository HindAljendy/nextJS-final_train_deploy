import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma"
import { Article } from "@/generated/prisma/client";


/**
    * @method GET
    * @route  ~/api/articles/search?seachText=value
    * @desc   Get Articles By seachText
    * @access public (anyone who opens the website , can see  articles By seachText OR No)
*/

export async function GET(request: NextRequest) {
    try {
        // get searchText from request : => {{DOMAIN}}/api/articles/search?searchText=Java
        const searchText = request.nextUrl.searchParams.get("searchText");    // string | null
        //console.log(searchText);

        let articles: Article[];
        if (searchText) {
            articles = await prisma.article.findMany({
                where: {
                    title: {               // title:searchText ,  equals , mode , startsWith , contains
                        startsWith: searchText,
                        mode: "insensitive"
                    }
                }
            });
        } else {
            articles = await prisma.article.findMany({
                take: 6
            });
        }

        return NextResponse.json(articles, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }

}