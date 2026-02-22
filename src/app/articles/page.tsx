import type { Metadata } from "next";
import styles from './articles.module.css'
import ArticleItem from '@/components/articles/ArticleItem';
import { Article } from "@/generated/prisma/client";
import SearchInputForm from "@/components/articles/SearchInputForm";
import ArticlesPaginate from "@/components/articles/ArticlesPaginate";
import { getArticles } from "@/apiCalls/articleApiCall";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import  prisma from "@/utils/prisma";



type TArticles = Array<Article>;

interface ArticlesPageTProps {
    searchParams: { pageNumber: string }
}

const ArticlesPage = async ({ searchParams }: ArticlesPageTProps) => {

    // object destructuring:
    const { pageNumber } = searchParams;

    /* dalay 10s for display loading page before display this page : */

   // await new Promise((resolve) => setTimeout(resolve, 10000));

    const articles: TArticles = await getArticles(pageNumber); // before articles: any
    console.log('articles', articles);// display the result in terminal server when click the page in browser..

    // pages :  عدد الصفحات بشكل ديناميكي 
    //const count: number = await getArticlesCount();

    // Sending Query To DB Without API :
    const count: number = await prisma.article.count();
    console.log("count" , count);
    
    const pages = Math.ceil(count / ARTICLE_PER_PAGE); //   25 / 6 = 4.1 => 5


    return (
        <section className="container articles_page fix-height">

            {/* search input Box  */}
            <SearchInputForm />

            {/* list of six articles */}
            <div className={styles.All_articles}>
                {
                    articles.map((item, index) => {
                        return (
                            <ArticleItem key={index} article={item} />
                        )
                    })
                }
            </div>

            {/* pagination */}
            <ArticlesPaginate
                pageNumber={parseInt(pageNumber)}
                route="/articles"
                pages={pages}
            />
        </section>
    )
}

export default ArticlesPage;

export const metadata: Metadata = {
    title: "Articles Page",
    description: "Articles about programming",
};


