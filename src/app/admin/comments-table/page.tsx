import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { verifyTokenForPage } from '@/utils/verifyToken';
import styles from '../admin.module.css'
import { Comment } from '@/generated/prisma/client';
import { DOMAIN } from '@/utils/constants';
import { getAllComments } from '@/apiCalls/adminApiCall';
import DeleteCommentButton from './DeleteCommentButton';



const AdminCommentsTable = async () => {

  /* protect admin dashbord */
  const token = cookies().get("jwtToken")?.value;
  if (!token) return redirect("/");

  const userPayload = verifyTokenForPage(token);
  if (userPayload?.isAdmin === false) return redirect("/");


  /* Get all comments  from ApiEndponit in server componnent */
  const comments: Comment[] =  await getAllComments(token);
  console.log("comments" , comments);

  return (
    <section className={`container fix-height ${styles.AdminCommmentsTable_page}`}>
      <h1>Comments</h1>
      <table>
        <thead>
          <tr>
            <th>Comment</th>
            <th className={styles.show}>CreatedAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            comments.map(comment => (
              <tr key={comment.id}>
                <td>{comment.text}</td>
                <td className={styles.show}>{new Date(comment.createdAt).toDateString()}</td>
                <td><DeleteCommentButton commentId={comment.id}/></td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </section>
  )
}

export default AdminCommentsTable