import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma"

/**
    * @method GET
    * @route  ~/api/articles/count
    * @desc   Get Articles  Count
    * @access public (anyone who opens the website , can Know number of articles)
*/

export async function GET(request: NextRequest) {
    try {
        const count : number = await prisma.article.count();   // "count": 20
        return NextResponse.json({ count }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }
}