import Link from 'next/link'
import React from 'react'
import styles from './header.module.css';
import Navbar from './Navbar';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
import LogoutButton from './LogoutButton';

const Header = () => {

    const token = cookies().get("jwtToken")?.value || "";
    const userpayload = verifyTokenForPage(token);

    return (
        <header className={styles.header}>
            {/* navbar */}
            <Navbar isAdmin={userpayload?.isAdmin || false} />

            {/* right header */}
            <div className={styles.right_header}>
                {
                    userpayload ? (
                        <>
                            <ul>
                                <li className={styles.userName}>{userpayload?.username}</li>
                                <li><LogoutButton/></li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul>
                                <li className={styles.btn}><Link href="/login">Login</Link></li>
                                <li className={styles.btn}><Link href="/register">Register</Link></li>
                            </ul>
                        </>
                    )
                }
            </div>
        </header>
    )
}

export default Header