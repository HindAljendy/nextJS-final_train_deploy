'use client';

import Link from "next/link";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({error , reset} : ErrorPageProps) => {
    return (
        <div className="container fix-height error-page">
            <h1>something went wrong</h1>
            <h2>Error Message : {error.message}</h2>
            <button onClick={()=>reset() }>Try Again</button>
            <Link href="/">Go to home page</Link>
        </div>
    )
}

export default ErrorPage