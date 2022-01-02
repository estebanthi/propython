import React from "react";
import NoHeaderLayout from "../../components/NoHeaderLayout";
import SignUpForm from "../../components/SignUpForm";


const SignUpPage = () => {

    return (
        <div className="mb-20">
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