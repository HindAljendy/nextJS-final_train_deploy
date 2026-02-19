"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from 'axios'
import ButtonSpinner from "@/components/ButtonSpinner";
import { DOMAIN } from "@/utils/constants";


const LoginForm = () => {

    //call Hook :
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // loading
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        /* validation :  قبل ارسال الطلب الى الباك validate fields in front  متحقق من ال 
            و  من ثم  في الباك تحقق ايضا من المدخلات 
        */
        
        //if (email === "")    return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");

        console.log({ email, password });

        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // مثال لتأخير

            await axios.post(`${DOMAIN}/api/users/login`, { email, password });
            /* توجيه المستخدم الى الصفحة الرئيسية بعد اتمام عملية تسجيل الدخول  +  تخزين التوكن في الكوكيز */
            router.replace('/');
            router.refresh();

            setLoading(false);
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={formSubmitHandler}>
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
            <button disabled={loading} type="submit">
                {loading ? <ButtonSpinner/> : "Login"}
            </button>
        </form>
    )
}

export default LoginForm