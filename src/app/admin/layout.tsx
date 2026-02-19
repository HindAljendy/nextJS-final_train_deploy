import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar"
import styles from './admin.module.css'

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Admin Dashbord",
    description: "This Is Admin Dashbord",
};

/* Own Layout for Admin page and its children(AdminArticlesPage , AdminCommentsPage ) */
const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className={`overflow-height ${styles.layoutAdmin}`}>
            <div className={`overflow-height ${styles.container_sidebar}`}>
                <AdminSidebar />
            </div>
            <div className={`overflow-height ${styles.container_content}`}>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout