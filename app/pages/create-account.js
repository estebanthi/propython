import LoginForm from "../components/LoginForm";
import {Layout} from "../components";
import React from "react";
import Home from "./index";
import NoHeaderLayout from "../components/NoHeaderLayout";
import CreateAccountForm from "../components/CreateAccountForm";


const CreateAccountPage = () => {

    return (
        <div className="flex justify-center mt-20">
            <CreateAccountForm />
        </div>
    )

}

export default CreateAccountPage

CreateAccountPage.getLayout = function getLayout(page) {

    return (
        <NoHeaderLayout>
            {page}
        </NoHeaderLayout>
    )

}