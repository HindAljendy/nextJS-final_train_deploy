'use client';

import Link from "next/link";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const AeticlesErrorPage = ({error , reset} : ErrorPageProps) => {
    return (
        <div className=" container fix-height error-page">
            <h2>This is Custom error Page for articles route/page</h2>
            <h1>something went wrong</h1>
            <h2>Error Message : {error.message}</h2>
            <button onClick={()=>reset() }>Try Again</button>
            <Link href="/">Go to home page</Link>
        </div>
    )
}

export default AeticlesErrorPage