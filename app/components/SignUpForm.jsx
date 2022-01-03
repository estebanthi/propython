import React, {useRef, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";
import Loader from "react-loader-spinner";
import Spinner from "./Spinner";

import jwt from "jsonwebtoken"


const SignUpForm = () => {

    const router = useRouter()

    const usernameEl = useRef()
    const emailEl = useRef()
    const passwordEl = useRef()

    const [allFieldsRequiredError, setAllFieldsRequiredError] = useState(false)
    const [emailTakenError, setEmailTakenError] = useState(false)
    const [usernameTakenError, setUsernameTakenError] = useState(false)
    const [notValidEmailError, setNotValidEmailError] = useState(false)
    const [serverError, setServerError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const handleSubmission = async () => {
        setAllFieldsRequiredError(false)
        setEmailTakenError(false)
        setUsernameTakenError(false)
        setNotValidEmailError(false)
        setServerError(false)
        setSuccess(false)

        const {value: username} = usernameEl.current
        const {value: email} = emailEl.current
        const {value: password} = passwordEl.current


        if (!username || !email || !password) {
            setAllFieldsRequiredError(true)
            return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setNotValidEmailError(true)
            return
        }

        setSpinner(true)


        let userFound = await axios.post("/api/users/check/email", {email: email})
            .then((result) => result.data.proPythonUser)
        if (userFound) {
            setEmailTakenError(true)
            setSpinner(false)
            return
        }

        userFound = await axios.post("/api/users/check/username", {username: username})
            .then((result) => result.data.proPythonUser)
        if (userFound) {
            setUsernameTakenError(true)
            setSpinner(false)
            return
        }

        const code = Math.round((Math.random() * (999999-100000) + 100000))
        var token = await jwt.sign({code: code, username: username, email: email, password: password}, process.env.NEXT_PUBLIC_JWT_SIGN)

        await axios.post("/api/mail/send-code", {code: code, email: email})

        await router.push({pathname: "/auth/verify", query: {token: JSON.stringify(token)}})

    }

    return (
        <div className="flex lg:justify-around justify-center flex-col lg:flex-row">
            <div className="flex flex-col bg-white w-auto rounded-md py-4 px-10 lg:mx-0 mx-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold border-b">Créer un compte</h1>
                    <div className="my-4 flex flex-col">
                        <span className="font-bold">Nom d'utilisateur</span>
                        <input
                            className="border-2 p-2 border-black rounded-md mt-2"
                            ref = {usernameEl}
                            type="text"
                            placeholder="Nom d'utilisateur"
                        />
                    </div>
                    <div className="my-4 flex flex-col">
                        <span className="font-bold">Email</span>
                        <input
                            className="border-2 p-2 border-black rounded-md mt-2"
                            ref = {emailEl}
                            type="text"
                            placeholder="Email"
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
                <div className="flex justify-center flex-col items-center">
                    {allFieldsRequiredError && <span className="font-bold text-red-500">Tous les champs sont requis.</span>}
                    {emailTakenError && <span className="font-bold text-red-500">Cette adresse mail est déjà utilisée.</span>}
                    {usernameTakenError && <span className="font-bold text-red-500">Ce nom d'utilisateur est déjà utilisé.</span>}
                    {notValidEmailError && <span className="font-bold text-red-500">Veuillez entrer un mail valide.</span>}
                        <button
                            type="button" onClick={handleSubmission}
                            className="w-full py-3 transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-md text-white cursor-pointer my-4"
                        >
                            Envoyer
                        </button>


                        <div className="my-4">
                        <Spinner visible={spinner}/>
                        </div>
                    {success && <span className="font-bold text-green-500">Compte créé avec succès !</span>}
                </div>
            </div>
        </div>
    )

}


export default SignUpForm