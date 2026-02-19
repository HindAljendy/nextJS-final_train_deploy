"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        // validation :
        if (title === "") return toast.error("Title is required");
        if (description === "") return toast.error("Description is required");

        console.log({ title, description });

        try {
            await axios.post(`${DOMAIN}/api/articles`, { title, description });
            setTitle("");
            setDescription("");
            toast.success("New Articles added..");
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
                placeholder='Enter Artilce Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                name="description"
                rows={5}
                placeholder='Enter Artilce Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button type="submit">Add</button>
        </form>
    )
}

export default AddArticleForm