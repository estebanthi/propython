import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { SessionProvider } from "next-auth/react"

import 'tailwindcss/tailwind.css'
import "../styles/globals.scss"
import ReactTooltip from "react-tooltip";

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
    const getLayout = Component.getLayout || ((page) => page)
    const layoutComponent = getLayout(<Component {...pageProps} />)
    return (<div><ReactTooltip type="dark"/>
    <SessionProvider session={session}>{layoutComponent}</SessionProvider></div>
)
}

export default MyApp
