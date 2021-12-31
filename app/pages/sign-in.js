import SignInForm from "../components/SignInForm";
import {Layout} from "../components";
import React from "react";
import Home from "./index";
import NoHeaderLayout from "../components/NoHeaderLayout";


const LoginPage = () => {

    return (
        <div className="flex justify-center mt-20">
            <SignInForm />
        </div>
    )

}

export default LoginPage

LoginPage.getLayout = function getLayout(page) {

    return (
        <NoHeaderLayout>
            {page}
        </NoHeaderLayout>
    )

}