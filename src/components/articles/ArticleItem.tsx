import React from 'react'
import styles from './article.module.css'
import Link from 'next/link'
import { Article } from "@/generated/prisma/client";


interface ArticleItemProps {
    article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
    return (
        <div className={styles.article}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            
            {/* Dynamic Route : */}
            <Link href={`/articles/${article.id}`}>Read More</Link>
        </div>
    )
}

export default ArticleItem