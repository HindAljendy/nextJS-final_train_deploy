"use client";

import React from 'react'
import styles from './header.module.css';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LogoutButton = () => {
    const router =  useRouter();

    const logoutHandler = async()=> {
        try {
            await axios.post(`${DOMAIN}/api/users/logout`);
            /* توجيه المستخدم الى الصفحة الرئيسية بعد اتمام عملية الخروج  +  حذف التوكن من الكوكيز */
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.warning("something went wrong..");
            console.log(error);
        }
    }

    return (
        <button  onClick={logoutHandler} className={styles.btn}>Logout</button>
    )
}

export default LogoutButton