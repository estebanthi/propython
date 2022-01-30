import React, {useEffect, useState} from "react";

import Link from "next/link"

import {countPremiums, goPremium} from "../services";
import {getSession, signIn} from "next-auth/react";
import {useRouter} from "next/router";
import Spinner from "./Spinner";


const PremiumWidget = () => {

    const router = useRouter()

    const [count, setCount] = useState(5)
    const [session, setSession] = useState(null)
    const [spinner, setSpinner] = useState(false)
    const [success, setSuccess] = useState(false)
    const [alreadyUsed, setAlreadyUsed] = useState(false)

    useEffect(async () => {
        const premiums = await countPremiums()
        setCount(premiums-1)
        const session = await getSession()
        setSession(session)
        if (session) { if (session.user.isPremium) {
            setAlreadyUsed(true)
        }}
    }, [])

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
            <span className="my-4">
                À l'occasion de la récente ouverture du site, <span className="font-bold">les 5 premiers inscrits peuvent passer premium à vie et gratuitement</span>, cliquez donc sur le bouton ci-dessous !
            </span>
            <div className="flex justify-center items-center flex-col">
                {session ? (session.user.isPremium ? <button disabled={true} className="inline-block bg-violet-300 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer my-4">Passer Premium</button> : <button className="transition duration-500 transform hover:-translate-y-1 inline-block bg-violet-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer my-4"
                onClick={async() => {
                    setSpinner(true)
                    await goPremium(session.user.email)
                    await signIn("credentials", {email: session.user.email, password: session.user.password, callbackUrl: router.asPath})
                    setSpinner(false)
                    setSuccess(true)
                }}
                >Passer Premium</button>) : <Link href={{pathname: "/auth/sign-up", query: {getPremium: true}}}><button className="transition duration-500 transform hover:-translate-y-1 inline-block bg-violet-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer my-4">Passer Premium</button></Link>}
                <span><span className="font-bold">{5-count}/5</span> premiums gratuits restants</span>
                {success ? <div className="w-70 text-center my-4"><span className="text-green-500">Vous êtes maintenant premium ! Vous allez être reconnecté.</span></div> : null}
                {alreadyUsed ? <div className="w-70 text-center my-4"><span className="text-green-500">Vous êtes déjà premium !</span></div> : null}
                {spinner ? <div className="my-2"><Spinner /></div> : null}
            </div>
            </div>
    )

}


export default PremiumWidget