"use client";

import { CommentWithUser } from '@/utils/types';
import style from './comments.module.css'
import { FaEdit, FaTrash } from 'react-icons/fa';
import UpdateCommentModal from './UpdateCommentModal';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Tprops {
    comment: CommentWithUser;
    userId: number | undefined;
    isAdmin: boolean | undefined
}

const CommentItem = ({ comment, userId, isAdmin }: Tprops) => {

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const commentDeleteHandler = async () => {
        try {
            if (confirm("you want delete this comment , Are you sure ?")) {
                await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }


    return (
        <div className={style.comment_item}>
            <div className={style.person_info}>
                <strong className={style.name}>{comment.user.username}</strong>
                <span className={style.date}>{new Date(comment.createdAt).toDateString()}</span>
            </div>

            <p className={style.comment_phrase}>{comment.text} </p>


            {/* Only Logged In User  */}
            {
                userId && userId === comment.userId && (
                    <div className={style.icons}>
                        <FaEdit onClick={() => setOpen(true)} className={style.icon_edit} />
                        <FaTrash onClick={commentDeleteHandler} className={style.icon_delete} />
                    </div>

                )
            }


            {
                open && <UpdateCommentModal
                    setOpen={setOpen}
                    text={comment.text}
                    commentId={comment.id} />
            }
        </div >
    )
}

export default CommentItem