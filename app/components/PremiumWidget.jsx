import React, {useEffect, useState} from "react";

import Link from "next/link"

import {countPremiums, goPremium} from "../services";
import {getSession, signIn} from "next-auth/react";
import {useRouter} from "next/router";
import Spinner from "./Spinner";


const PremiumWidget = () => {

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 pb-4 mb-8">
            <h1 className={"text-xl mb-8 font-semibold border-b pb-4 border-violet-900"}>Premium - 15€/mois</h1>
            <div>
                L'accès à <span className="text-violet-900">des articles inédits</span>, à <span className="text-violet-900">une multitude de ressources</span>, à <span className="text-violet-900">de nouveaux projets</span>, mais également à <span className="text-violet-900">des vidéos explicatives</span>, découvrez ici pourquoi passer premium.
            </div>
            <div className="flex justify-center my-4">
                <Link href="/premium">
                    <button className="transition duration-500 transform hover:-translate-y-1 inline-block bg-violet-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                        En savoir plus
                    </button>
                </Link>
            </div>
        </div>
    )

}


export default PremiumWidget