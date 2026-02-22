import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { verifyTokenForPage } from '@/utils/verifyToken';
import styles from '../admin.module.css'
import { getArticles, getArticlesCount } from '@/apiCalls/articleApiCall';
import { Article } from '@/generated/prisma/client';
import { ARTICLE_PER_PAGE } from '@/utils/constants';
import ArticlesPaginate from '@/components/articles/ArticlesPaginate';
import Link from 'next/link';
import DeleteArticleButton from './DeleteArticleButton';
import prisma from '@/utils/prisma';


type TArticle = Array<Article>;

interface Tprops {
  searchParams: { pageNumber: string }
}

const AdminArticlesTable = async ({ searchParams: { pageNumber } }: Tprops) => {

  /* protect admin dashbord */
  const token = cookies().get("jwtToken")?.value;
  if (!token) return redirect("/");

  const userPayload = verifyTokenForPage(token);
  if (userPayload?.isAdmin === false) return redirect("/");


  const articles: TArticle = await getArticles(pageNumber);

  //const count: number = await getArticlesCount();

  // Sending Query To DB Without API :
  const count: number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className={`container fix-height ${styles.AdminArticlesTable_page}`}>
      <h1>Articles</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th className={styles.show}>CreatedAt</th>
            <th>Actions</th>
            <th className={styles.show}></th>
          </tr>
        </thead>

        <tbody>
          {
            articles.map(article => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td className={styles.show}>{new Date(article.createdAt).toDateString()}</td>
                <td>
                  <Link href={`/admin/articles-table/edit/${article.id}`}
                    className={styles.edit}>Edit
                  </Link>

                  <DeleteArticleButton articleId={article.id} />
                </td>
                <td className={styles.show}><Link href={`/articles/${article.id}`}
                  className={styles.readMore}>ReadMore</Link>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>

      <ArticlesPaginate
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/articles-table"
      />

    </section>
  )
}

export default AdminArticlesTable