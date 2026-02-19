import { cookies } from 'next/headers'
import AddArticleForm from './AddArticleForm'
import styles from './admin.module.css'
import { redirect } from 'next/navigation';
import { verifyTokenForPage } from '@/utils/verifyToken';


const AdminPage = () => {

    /* protect admin dashbord */
    const token = cookies().get("jwtToken")?.value;
    if (!token) return redirect("/");

    const userPayload = verifyTokenForPage(token);
    if (userPayload?.isAdmin === false)   return redirect("/");

    
    return (
        <div className={`container fix-height ${styles.admin_page}`}>
            <div className={styles.container_formAddArticle}>
                <h2>Add New Article</h2>
                <AddArticleForm/>
            </div>
        </div>
    )
}

export default AdminPage