import React from "react";
import NoHeaderLayout from "../../components/NoHeaderLayout";
import SignUpForm from "../../components/SignUpForm";
import Head from "next/head";

const SignUpPage = () => {

    return (
        <div className="my-10">
            <Head>
                <title>Créer un compte - ProPython
                </title>
                <link rel="icon" href="https://media.graphcms.com/OYRgW8aSKuiUBJTEehZA" />
            </Head>
            <SignUpForm />
        </div>
    )

}

export default SignUpPage

SignUpPage.getLayout = function getLayout(page) {

    return (
        <NoHeaderLayout>
            {page}
        </NoHeaderLayout>
    )

}