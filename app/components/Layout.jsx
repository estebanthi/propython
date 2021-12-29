import React from "react"
import { Header } from "./";
import {ClerkProvider, SignInButton} from "@clerk/nextjs";



const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Layout