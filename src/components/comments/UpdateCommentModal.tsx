"use client";

import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import style from './comments.module.css'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';


interface Tprop {
    setOpen: Dispatch<SetStateAction<boolean>>;
    text:string;
    commentId:number
}

const UpdateCommentModal = ({ setOpen , text , commentId}: Tprop) => {

    const [updatedText, setUpdatedText] = useState(text);
    const router = useRouter();
    
    const formSubmitHandler = async(e:FormEvent)=> {
        e.preventDefault();

        /* validation: */
        if (updatedText ==="") return toast.info("Plaese write something ..");

        console.log({updatedText});
        
        try {
            await axios.put(`${DOMAIN}/api/comments/${commentId}` , {text : updatedText});
            router.refresh();
            setUpdatedText("");
            setOpen(false);
        } catch (error:any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }

    return (
        <div className={style.overlay_Modal_updateComment}>
            <div className={style.modal}>
                <div className={style.modal_header}>
                    <IoMdCloseCircleOutline onClick={() => setOpen(false)} className={style.icon} />
                </div>

                <form onSubmit={formSubmitHandler}>
                    <input
                        type="text"
                        placeholder='Edit Comment ...'
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                    />

                    <button type="submit">Edit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCommentModal