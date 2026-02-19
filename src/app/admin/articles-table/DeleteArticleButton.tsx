"use client";

import React from 'react'
import styles from '../admin.module.css'
import axios from 'axios'
import { DOMAIN } from '@/utils/constants'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Tprop {
    articleId: number
}

const DeleteArticleButton = ({ articleId }: Tprop) => {

    const router = useRouter();

    const DeleteArticleHandler = async () => {
        try {
            if (confirm("You want delete this article , Are you sure ?")) {
                await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
                toast.success("Article Deleted");
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }
    return (
        <div onClick={DeleteArticleHandler} className={styles.delete}>Delete</div>
    )
}

export default DeleteArticleButton