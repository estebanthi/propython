import SignInForm from "../../components/SignInForm";
import React from "react";
import NoHeaderLayout from "../../components/NoHeaderLayout";
import {getRessources} from "../../services";


const SignInPage = () => {

    return (
        <div className="flex justify-center mb-20">
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
