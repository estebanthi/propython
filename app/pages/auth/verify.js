import React from "react";
import NoHeaderLayout from "../../components/NoHeaderLayout";
import VerifyForm from "../../components/VerifyForm"
import Head from "next/head";

const VerifyPage = () => {

    return (
        <div className="mb-20">
            <Head>
                <title>Vérification - ProPython</title>
                <link rel="icon" href="https://media.graphcms.com/OYRgW8aSKuiUBJTEehZA" />
            </Head>
            <VerifyForm />
        </div>
    )

}

export default VerifyPage

VerifyPage.getLayout = function getLayout(page) {

    return (
        <NoHeaderLayout>
            {page}
        </NoHeaderLayout>
    )

}