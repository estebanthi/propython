import SignInForm from "../../components/SignInForm";
import React from "react";
import NoHeaderLayout from "../../components/NoHeaderLayout";
import {getRessources} from "../../services";
import Head from "next/head";


const SignInPage = () => {

    return (
        <div className="flex justify-center mb-20">
            <Head>
                <link rel="icon" href="https://media.graphcms.com/OYRgW8aSKuiUBJTEehZA" />
                <title>Se connecter - ProPython</title>
            </Head>
            <SignInForm/>
        </div>
    )

}


export default SignInPage

SignInPage.getLayout = function getLayout(page) {

    return (
        <NoHeaderLayout>
            {page}
        </NoHeaderLayout>
    )

}
