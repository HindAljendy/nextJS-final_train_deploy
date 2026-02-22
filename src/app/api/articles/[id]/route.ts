import { UpdateArticleDto } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma"
import { JWTPayload } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";



interface Tprops {
    params: { id: string };
}

/**
    * @method GET
    * @route  ~/api/articles/:id
    * @desc   Get Single Article By Id
    * @access public

export async function GET(request: NextRequest, { params }: Tprops) {
    // console.log(props);    => { params: { id: '1' } }

    try {
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) }
        })

        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 });
        }

        return NextResponse.json(article, { status: 200 });
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
    * @route  ~/api/articles/:id
    * @desc   Get Single Article By Id
    * @access public
*/

export async function GET(request: NextRequest, { params }: Tprops) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                comments: {                             // comments :true
                    include: {
                        user: {                  // user :true
                            select: { username: true }
                        }
                    },
                    orderBy: { createdAt: 'desc' }     // newest to oldest 
                }
            }
        })

        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 });
        }

        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );

    }
}



/**
    * @method PUT
    * @route  ~/api/articles/:id
    * @desc   Update Article By Id
    * @access private (only admin can update article)
*/
export async function PUT(request: NextRequest, { params }: Tprops) {
    // console.log(props);    => { params: { id: '1' } }

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

        // update :
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 });
        }

        //  throw new Error()

        const body = (await request.json()) as UpdateArticleDto;

        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description
            }
        });
        console.log(updatedArticle);

        return NextResponse.json({ updatedArticle, message: "Update Successfuly" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }
}

/**
    * @method DELETE
    * @route  ~/api/articles/:id
    * @desc   Delete Article By Id
    * @access private (only admin can delete article)
*/
export async function DELETE(request: NextRequest, { params }: Tprops) {
    // console.log(props);    => { params: { id: '1' } }

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

        // delete :
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) },
            include: { comments: true }
        });

        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 });
        }

        // delete the article:
        await prisma.article.delete({ where: { id: parseInt(params.id) } });

        // delete the comments that belong to this article :
        const commentsIds : number [] = article?.comments.map(comment => comment.id);
        await prisma.comment.deleteMany({
            where : {id : {in :commentsIds }}
        });

        return NextResponse.json({ message: "Deleted Successfuly" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }
}

