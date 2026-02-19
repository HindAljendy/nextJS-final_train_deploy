import { getSingleArticle } from '@/apiCalls/articleApiCall'
import styles from '../../../admin.module.css'
import EditArticleForm from './EditArticleForm'
import { Article } from '@/generated/prisma/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyTokenForPage } from '@/utils/verifyToken'

interface EditArticlePageProps {
  params: { id: string }
}

const EditArticlePage = async ({ params }: EditArticlePageProps) => {

  /* protect admin dashbord */
  const token = cookies().get("jwtToken")?.value;
  if (!token) return redirect("/");

  const userPayload = verifyTokenForPage(token);
  if (userPayload?.isAdmin === false) return redirect("/");


  const article: Article = await getSingleArticle(params.id);

  return (
    <section className={`container fix-height ${styles.AdminEditArticle_page}`}>
      <div className={styles.container_formEditArticle}>
        <h2>Edit Article</h2>
        <EditArticleForm article={article}/>
      </div>
    </section>
  )
}

export default EditArticlePage