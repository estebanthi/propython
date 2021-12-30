import React, { useEffect, useState } from "react";
import { Layout } from "../components";

import 'tailwindcss/tailwind.css'
import "../styles/globals.scss"
import {ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignInButton} from "@clerk/nextjs";
import {useRouter} from "next/router";

const publicPages = ["/", "/ressources", "/post/[slug]", "/category/[slug]", "/sign-in/[[...index]]", "/sign-up/[[...index]]"];
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API

function MyApp({ Component, pageProps }) {

    const { pathname } = useRouter();
    const isPublicPage = publicPages.includes(pathname);



    const getLayout = Component.getLayout || ((page) => page)
    return (<ClerkProvider >
        {isPublicPage ? (
            getLayout(<Component {...pageProps} />)
        ) : (
            <>
                <SignedIn>
                    {getLayout(<Component {...pageProps} />)}
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        )}
    </ClerkProvider>)
}

export default MyApp
