"use client";

import { useState } from "react";
import style from './comments.module.css'
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";


interface Tprop {
    articleId: number
}

const AddCommentForm = ({ articleId }: Tprop) => {
    const [text, setText] = useState("");

    const router = useRouter();

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        /* validation: */
        if (text === "") return toast.error("Please write something");

        console.log({ text });

        try {
            await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
            router.refresh();
            setText("");
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }

    return (
        <form onSubmit={formSubmitHandler} className={style.form_addComment}>
            <input
                type="text"
                name="comment"
                placeholder="Add a comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">comment</button>
        </form>
    )
}

export default AddCommentForm