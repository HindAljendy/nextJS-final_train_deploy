import Link from 'next/link'
import styles from './admin.module.css'
import { CgMenuGridR } from 'react-icons/cg';
import { MdOutlineArticle } from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className={styles.admin_sidebar}>
      <Link href="/admin" className={styles.dashboard_link}>
        <CgMenuGridR size={30} className={styles.icon}/> <span>Dashboard</span>
      </Link>

      <ul>
        <li>
          <Link href="/admin/articles-table?pageNumber=1">
            <MdOutlineArticle size={20} className={styles.icon} /> <span>Articles</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/comments-table">
            <FaRegComments size={20} className={styles.icon} />  <span>Comments</span>
          </Link>
        </li>
      </ul>


    </div>
  )
}

export default AdminSidebar