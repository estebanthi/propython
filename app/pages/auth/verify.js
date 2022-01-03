import React from "react";
import NoHeaderLayout from "../../components/NoHeaderLayout";
import VerifyForm from "../../components/VerifyForm"


const VerifyPage = () => {

    return (
        <div className="mb-20">
            <VerifyForm />
        </div>
    )

}

export default VerifyPage

VerifyPage.getLayout = function getLayout(page) {

    return (
        <NoHeaderLayout>
            {page}
        </NoHeaderLayout>
    )

}