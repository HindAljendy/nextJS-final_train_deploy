"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import ButtonSpinner from "@/components/ButtonSpinner";


const RegisterForm = () => {

    // call Hook :
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);


    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        /* validation : */
        if (username === "") return toast.error("Username is required");
        if (email === "")    return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");


        console.log({ username, email, password });

        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // مثال لتأخير

            await axios.post(`${DOMAIN}/api/users/register`, { username, email, password });
            /*  تسجيل حساب للمستخدم  في قاعدة البيانات + تخزين التوكن في الكوكيز  */

            /*  توجيه المستخدم الى الصفحة الرئيسية بعد اتمام عملية تسجيل  الحساب */
            router.replace('/');
            setLoading(false);
            router.refresh();
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <input
                type="text"
                name="username"
                placeholder='Enter Your Name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                name="email"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                name="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{loading ? <ButtonSpinner/> : "Register"}</button>
        </form>
    )
}

export default RegisterForm