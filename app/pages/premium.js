import {Layout, PostCard} from "../components";
import React from "react";
import Home from "./index";
import SideLayout from "../components/SideLayout";


const PremiumPage = () => {

    return (
        <div>
            <div className="px-10">
                <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
                    Page pas encore disponible !
                </div>
            </div>
        </div>
    )

}

export default PremiumPage


PremiumPage.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )

}