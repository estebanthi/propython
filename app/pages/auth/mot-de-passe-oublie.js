import NewPasswordForm from "../../components/NewPasswordForm";
import Head from "next/head";
import React from "react";


export default function Page() {

    return (
        <div className="my-10">
            <Head>
                <title>Créer un compte - ProPython
                </title>
            </Head>
            <div className="flex justify-center items-center">
            <NewPasswordForm />
            </div>
        </div>
    )

}