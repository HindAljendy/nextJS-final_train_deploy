"use client";

import { Article } from "@/generated/prisma/client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditArticleFormProps {
    article: Article
}

const EditArticleForm = ({ article }: EditArticleFormProps) => {

    const router = useRouter();

    const [updatedTitle, setUpdatedTitle] = useState(article.title);
    const [updatedDescription, setUpdatedDescription] = useState(article.description);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        //validation
        if (updatedTitle === "")      return toast.error("Title is required");
        if (updatedDescription === "") return toast.error("Description is required");

        console.log({ updatedTitle, updatedDescription });

        try {
            await axios.put(`${DOMAIN}/api/articles/${article.id}`, { title: updatedTitle, description: updatedDescription });
            setUpdatedTitle("");
            setUpdatedDescription ("");
            toast.success("Article updated");
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }
    return (
        <form onSubmit={formSubmitHandler}>
            <input
                type="text"
                name="title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <textarea
                name="description"
                rows={5}
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
            ></textarea>

            <button type="submit">Edit</button>
        </form>
    )
}

export default EditArticleForm