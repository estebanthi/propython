import SignInForm from "../../components/SignInForm";
import React from "react";
import NoHeaderLayout from "../../components/NoHeaderLayout";


const SignInPage = () => {

    return (
        <div className="flex justify-center mt-20">
            <SignInForm error={null}/>
        </div>
    )

}

export async function getServerSideProps() {


    return {
        props: {
            error: null
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
