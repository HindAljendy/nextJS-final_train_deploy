import { cookies } from 'next/headers';
import styles from './login.module.css'
import LoginForm from './LoginForm'
import { redirect } from 'next/navigation';

const LoginPage = () => {
    /* check from middlware if token موجود */
    /* اذا كان موجود => redirect to home page 
    ELSE : view login Page Here 
    */

    return (
        <section className={`container fix-height ${styles.login_page}`}>
            <div className={styles.content_login}>
                <h1>Log In</h1>
                <LoginForm />
            </div>
        </section>
    )
}

export default LoginPage