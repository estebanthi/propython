import Link from "next/link";
import moment from "moment";
import React, {useEffect, useState} from "react";
import LinkedArticle from "./LinkedArticle";
import axios from "axios";
import {submitDownload} from "../services";
import {getSession} from "next-auth/react";
import {WorkspacePremium} from "@mui/icons-material";
import {useRouter} from "next/router";


const RessourceCard = ({ressource}) => {

    const [session, setSession] = useState(null)
    const router = useRouter()

    useEffect(async () => {
        const session = await getSession()
        setSession(session)
    }, [])

    const handleDownload = async () => {
        const res = await submitDownload(ressource.associatedAsset.id)
    }

    return (
        <div className="flex items-center justify-center xl:justify-between 2xl:px-20 my-8 mx-20">
            <div className="xl:w-1/2 bg-white shadow-lg rounded-lg p-4 xl:p-8 pb-8 flex flex-col xl:flex-row justify-between items-center">
                <div className="flex flex-col">
                    <div className="flex items-center">
                    <h1 className="transition duration-700 text-left cursor-pointer hover:text-pink-600 text-3xl font-semibold">
                        {ressource.title}
                    </h1>
                        {ressource.premium ? <span className="text-violet-900 ml-4" data-tip="Ressource premium">
                        <WorkspacePremium />
                            </span> : null}
                    </div>
                    <span className="mt-4">{ressource.description}</span>
                </div>
                {ressource.premium ? (!session ? <Link href={{pathname: "/auth/sign-in", query: {callbackUrl: router.asPath}}}>
                    <button
                        type="button"
                        className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-violet-900 text-lg rounded-full text-white px-8 py-2 cursor-pointer lg:ml-10 mt-4 lg:mt-0"
                    >
                        Se connecter
                    </button>
                </Link> : (session.user.isPremium ? <Link href={{pathname: "/api/download", query: {id: ressource.associatedAsset.id}}}>
                    <button
                        type="button"
                        className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-violet-900 text-lg rounded-full text-white px-8 py-2 cursor-pointer lg:ml-10 mt-4 lg:mt-0"
                    >
                        Télécharger
                    </button>
                </Link> : <Link href="/premium"><button className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-violet-900 text-lg rounded-full text-white px-8 py-2 cursor-pointer lg:ml-10 mt-4 lg:mt-0">Devenir Premium</button></Link>)) : <Link href={{pathname: "/api/download", query: {id: ressource.associatedAsset.id}}}>
                    <button
                        type="button"
                        className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-2 cursor-pointer lg:ml-10 mt-4 lg:mt-0"
                    >
                        Télécharger
                    </button>
                </Link>}
            </div>
            <div className="hidden xl:contents">
                <LinkedArticle post={ressource.associatedpost}/>
            </div>
        </div>
    )

}

export default RessourceCard