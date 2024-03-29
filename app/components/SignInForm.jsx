import React, {useEffect, useRef, useState} from "react";
import Link from "next/link"
import axios from "axios";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import Spinner from "./Spinner";


const SignInForm = (props) => {

    const [allFieldsRequiredError, setAllFieldsRequiredError] = useState(false)
    const [error, setError] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const [remember, setRemember] = useState(true)
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const router = useRouter()

    useEffect(() => {
        if (router.query.error == "CredentialsSignin") {
            setError(true)
        }
        const passwordStor = localStorage.getItem("password")
        const emailStor = localStorage.getItem("email")
        setPassword(passwordStor)
        setEmail(emailStor)
    }, [])



    const handleLoginSubmission = async () => {
        setError(false)
        setAllFieldsRequiredError(false)

        if (!email || !password) {
            setAllFieldsRequiredError(true)
            return
        }



        if (remember) {
            localStorage.setItem("password", password)
            localStorage.setItem("email", email)
        }

        else {
            localStorage.setItem("password", "")
            localStorage.setItem("email", "")
        }

        setSpinner(true)

        await signIn("credentials", {email: email, password: password, callbackUrl:(router.query.callbackUrl ? process.env.NEXT_PUBLIC_BASE_URL+router.query.callbackUrl : process.env.NEXT_PUBLIC_BASE_URL)})

        setSpinner(false)
    }

    return (
        <div className="flex lg:justify-around justify-center flex-col lg:flex-row">
            <div className="flex flex-col bg-white w-auto rounded-md py-4 px-10 lg:mx-0 mx-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold border-b">Se Connecter</h1>
                    <form>
                        <div className="my-4 flex flex-col">
                            <span className="font-bold">Email</span>
                            <input
                                className="border-2 p-2 border-black rounded-md mt-2"
                                type="text"
                                placeholder="Entrez votre email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="my-4 flex flex-col">
                            <span className="font-bold">Mot de passe</span>
                            <input
                                className="border-2 p-2 border-black rounded-md mt-2"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="**************"
                            />
                        </div>
                    </form>
                </div>
                <div>
                    <div className="my-4">
                        <label className="font-bold">
                            <input checked={remember} onChange={() => setRemember(!remember)}
                                type="checkbox"
                            />
                            <span className="ml-1">
                        Se souvenir de moi
                        </span>
                        </label>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                    <div className="flex justify-center">
                        {allFieldsRequiredError && <span className="font-bold text-red-500">Tous les champs sont requis.</span>}
                        {error && <span className="font-bold text-red-500">Identifiants invalides.</span>}
                    </div>
                    <button
                        type="button" onClick={handleLoginSubmission}
                        className="w-full py-3 transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-md text-white cursor-pointer my-4"
                    >
                        Envoyer
                    </button>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Link href="/auth/mot-de-passe-oublie">
                        <span className="cursor-pointer text-blue-700">Mot de passe oublié ?</span>
                    </Link>
                </div>
                <div className="my-4 flex justify-center">
                    <Spinner visible={spinner}/>
                </div>
            </div>
            <div className="w-auto ">
                <div className="flex flex-col items-center justify-center mt-10 bg-white rounded-md py-4 px-10 lg:mx-10 mx-4">
                    <h1 className="text-lg font-bold border-b">Pas encore de compte ?</h1>
                    <Link href={{pathname: "/auth/sign-up", query: {callbackUrl: router.query.callbackUrl}}}>
                        <button
                            type="button"
                            className="w-full py-3 transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-md text-white cursor-pointer my-4"
                        >
                            Créer un compte
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )

}


export default SignInForm