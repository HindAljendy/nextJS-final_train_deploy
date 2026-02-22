"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import { GrTechnology } from 'react-icons/gr'
import styles from './header.module.css'
import { FaBars, FaTimes } from 'react-icons/fa';


interface Tprops {
    isAdmin: boolean | undefined;
}

const Navbar = ({ isAdmin }: Tprops) => {
    console.log("Navbar client component");

    //! useState for change the menu icon when click to open the menu mobile  + open menu mobile :
    const [click, setClick] = useState(false);  // boolean
    const handleClick = () => setClick(!click);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">
                    CLOUD<GrTechnology />HOSTING
                </Link>
            </div>

            <div className={styles.navLinksWrapper}
                style={{
                    clipPath: click && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ""
                }} >
                <ul className={styles.navlinks}>
                    <li><Link onClick={handleClick} href="/">Home</Link></li>
                    <li><Link onClick={handleClick} href="/about">About</Link></li>
                    <li><Link onClick={handleClick} href="/articles?pageNumber=1">Articles</Link></li>
                    
                    {isAdmin && (
                        <li><Link onClick={handleClick} href="/admin">Admin Dashbord</Link></li>
                    )}
                    
                </ul>
            </div>

            {/* menu icon */}
            <div className={styles.hamburger} onClick={handleClick}>
                {
                    click ?
                        <FaTimes size={20} style={{ color: "#000" }} /> // close icon
                        : <FaBars size={20} style={{ color: "#000" }} />
                }
            </div>
        </nav>
    )
}

export default Navbar