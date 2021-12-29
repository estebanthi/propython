import LoginForm from "../components/LoginForm";
import {Layout} from "../components";
import React from "react";
import Home from "./index";
import NoHeaderLayout from "../components/NoHeaderLayout";


const LoginPage = () => {

    return (
        <div className="flex justify-center mt-20">
            <LoginForm />
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