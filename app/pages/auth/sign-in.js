import SignInForm from "../../components/SignInForm";
import React from "react";
import NoHeaderLayout from "../../components/NoHeaderLayout";


const SignInPage = (props) => {

    return (
        <div className="flex justify-center mt-20">
            <span>Hello</span>
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
