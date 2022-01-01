import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { SessionProvider } from "next-auth/react"

import 'tailwindcss/tailwind.css'
import "../styles/globals.scss"

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
    const getLayout = Component.getLayout || ((page) => page)
    const layoutComponent = getLayout(<Component {...pageProps} />)
    return <SessionProvider session={session}>{layoutComponent}</SessionProvider>
}

export default MyApp
