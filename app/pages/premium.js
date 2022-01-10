import {Layout} from "../components";
import React from "react";
import SideLayout from "../components/SideLayout";


const PremiumPage = () => {

    return (
        <div>
            <div className="container mx-auto px-10 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        <div className="lg:col-span-8 col-span-1">
                            <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
                                <h1 className="text-3xl font-bold">Pourquoi devenir premium ?</h1>
                                <div>
                                    <h2 className="text-2xl font-semibold mt-20">1. Des articles inédits</h2>
                                    <div className="my-4">
                                        <p>Découvrez des articles réservés aux membres premium. En voici quelques uns :</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="lg:col-span-4 col-span-1">
                            <div className="lg:sticky relative top-8">
                                <SideLayout />
                            </div>
                        </div>
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