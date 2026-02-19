"use client";

import { useState } from "react";
import styles from './article.module.css'
import { useRouter } from "next/navigation";

const SearchInputForm = () => {
    // call hook :
    const router = useRouter();

    const [searchText, setSearchText] = useState("");

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({ searchText });
        
        router.push(`/articles/search?searchText=${searchText}`);
    }

    return (
        <form onSubmit={formSubmitHandler} className={styles.search_input_article}>
            <input
                type="search"
                name="search-article"
                placeholder="Search For Article"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </form>
    )
}

export default SearchInputForm