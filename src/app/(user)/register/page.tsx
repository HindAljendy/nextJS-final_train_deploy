import { cookies } from 'next/headers'
import styles from './register.module.css'
import RegisterForm from './RegisterForm'
import { redirect } from 'next/navigation';


const RegisterPage = () => {
    /* check from middlware if token موجود */
    /* اذا كان موجود => redirect to home page 
    ELSE : view register Page Here 
    */

    return (
        <section className={`container fix-height ${styles.register_page}`}>
            <div className={styles.content_register}>
                <h1>Create New Account</h1>
                <RegisterForm />
            </div>
        </section>
    )
}

export default RegisterPage