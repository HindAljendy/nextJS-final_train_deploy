import Link from "next/link"

const NotFoundPage = () => {
    return (
        <section className="fix-height not-found-page">
            <h1>404</h1>
            <p>Page Not Found</p>
            <Link href="/">Go to home page</Link>
        </section>
    )
}

export default NotFoundPage