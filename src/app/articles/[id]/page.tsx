import { TsingleArticle } from "@/utils/types";
import styles from '../articles.module.css'
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import prisma from "@/utils/prisma";
import { notFound, redirect } from "next/navigation";

interface SingleArticlePageProps {
    params: { id: string }
}

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {

    const token = cookies().get("jwtToken")?.value || "";
    const userPayload = verifyTokenForPage(token);

    // console.log('props', props);  =>   props { params: { id: '2' }, searchParams: {} }

    // send api request to get single article info:

    await new Promise((resolve) => setTimeout(resolve, 10000));

    // const article: TsingleArticle = await getSingleArticle(params.id);

    // Sending Query To DB Without API :
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
    }) as TsingleArticle ;

    if (!article) {
        // throw new Error("Article Not Found");
        //redirect("/not-found");
        notFound();
    }

    console.log('article', article);

    return (
        <section className={` container fix-height ${styles.open_article}`}>

            {/* details Article : */}
            <div className={styles.single_article}>
                <div className={styles.info}>
                    <h1>{article.title}</h1>
                    <span>{new Date(article.createdAt).toDateString()}</span>
                </div>
                <p>{article.description}</p>
            </div>

            {/* Add Comment Form  only for LoggedIn user */}
            <div>
                {
                    userPayload ? (
                        <AddCommentForm articleId={article.id} />
                    ) : (
                        <p className={styles.warning}>
                            To write a comment , You should Log In first ,,
                        </p>
                    )
                }
            </div>

            {/* List of Comments */}
            <h4 className={styles.title_comments}>All Comments</h4>
            {
                article.comments.map(comment => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        userId={userPayload?.id}
                        isAdmin={userPayload?.isAdmin}
                    />
                ))
            }

        </section>
    )
}

export default SingleArticlePage
