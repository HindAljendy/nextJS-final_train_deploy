"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from '../admin.module.css'

interface Tprop {
    commentId: number
}

const DeleteCommentButton = ({ commentId }: Tprop) => {

    const router = useRouter();

    const DeleteCommentHandler = async () => {
        try {
            if (confirm("you want delete this comment , Are You Sure ? ")) {
                axios.delete(`${DOMAIN}/api/comments/${commentId}`);
                toast.success("comment deleted");
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }
    return (
        <div onClick={DeleteCommentHandler} className={styles.delete}>Delete</div>
    )
}

export default DeleteCommentButton