import SignInForm from "../components/SignInForm";
import {Layout} from "../components";
import React from "react";
import Home from "./index";
import NoHeaderLayout from "../components/NoHeaderLayout";


const SignInPage = () => {

    return (
        <div className="flex justify-center mt-20">
            <SignInForm />
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