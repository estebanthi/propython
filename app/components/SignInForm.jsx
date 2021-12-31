import React, {useRef} from "react";
import Link from "next/link"


const SignInForm = () => {

    const emailEl = useRef()
    const passwordEl = useRef()

    const handleLoginSubmission = () => {

    }

    return (
        <div className="flex lg:justify-around justify-center flex-col lg:flex-row">
        <div className="flex flex-col bg-white w-auto rounded-md py-4 px-10 lg:mx-0 mx-4">
        <div className="flex flex-col items-center">
           <h1 className="text-xl font-bold border-b">Se Connecter</h1>
            <div className="my-4 flex flex-col">
                <span className="font-bold">Email</span>
                <input
                    className="border-2 p-2 border-black rounded-md mt-2"
                    ref = {emailEl}
                    type="text"
                    placeholder="Entrez votre email"
                />
            </div>
            <div className="my-4 flex flex-col">
                <span className="font-bold">Mot de passe</span>
                <input
                    className="border-2 p-2 border-black rounded-md mt-2"
                    ref = {passwordEl}
                    type="password"
                    placeholder="**************"
                />
            </div>
        </div>
            <div>
            <div className="my-4">
                <label className="font-bold">
                    <input
                        type="checkbox"
                    />
                    <span className="ml-1">
                        Se souvenir de moi
                        </span>
                </label>
            </div>
            <button
                type="button" onClick={handleLoginSubmission}
                className="w-full py-3 transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-md text-white cursor-pointer my-4"
            >
                Envoyer
            </button>
        </div>
            <div className="flex justify-end">
                <Link href="/mot-de-passe-oublie">
                    <span className="cursor-pointer text-blue-700">Mot de passe oublié ?</span>
                </Link>
            </div>
        </div>
            <div className="w-auto ">
                <div className="flex flex-col items-center justify-center mt-10 bg-white rounded-md py-4 px-10 lg:mx-10 mx-4">
                    <h1 className="text-lg font-bold border-b">Pas encore de compte ?</h1>
                    <Link href="/sign-up">
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