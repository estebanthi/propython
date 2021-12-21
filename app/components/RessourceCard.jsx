import Link from "next/link";
import moment from "moment";
import React from "react";
import LinkedArticle from "./LinkedArticle";
import axios from "axios";
import {submitDownload} from "../services";


const RessourceCard = ({ressource}) => {

    const handleDownload = async () => {
        const res = await submitDownload(ressource.associatedAsset.id)
        console.log(res)
    }

    return (
        <div className="flex w-full items-center justify-center xl:justify-around 2xl:px-20">
            <div className="xl:w-1/2 bg-white shadow-lg rounded-lg p-4 xl:p-8 pb-8 flex flex-col xl:flex-row justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="transition duration-700 text-left cursor-pointer hover:text-pink-600 text-3xl font-semibold">
                        {ressource.title}
                    </h1>
                    <span className="mt-4">{ressource.description}</span>
                </div>
                <button onClick={handleDownload}
                        type="button"
                        className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-0 cursor-pointer h-12 lg:ml-10 mt-4 lg:mt-0"
                    >
                        Télécharger
                </button>
            </div>
            <div className="hidden xl:contents">
                <LinkedArticle post={ressource.associatedpost}/>
            </div>
        </div>
    )

}

export default RessourceCard