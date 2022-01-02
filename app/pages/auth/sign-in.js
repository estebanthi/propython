import SignInForm from "../../components/SignInForm";
import {Layout} from "../../components";
import React from "react";
import Home from "../index";
import NoHeaderLayout from "../../components/NoHeaderLayout";

import { getCsrfToken } from "next-auth/react"


const SignInPage = (props) => {

    return (
        <div className="flex justify-center mt-20">
            <SignInForm error={props.error}/>
        </div>
    )

}

export async function getServerSideProps({query}) {


    return {
        props: {
            error: query.error || null
        }
    }
}

export default SignInPage

SignInPage.getLayout = function getLayout(page) {

    return (
        <NoHeaderLayout>
            {page}
        </NoHeaderLayout>
    )

}
