import {useRouter} from "next/router";
import React, {useRef, useState} from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import Link from "next/link";
import Spinner from "./Spinner";
import {signIn} from "next-auth/react";


const NewPasswordForm = () => {

    const router = useRouter()

    const emailEl = useRef()
    const passwordEl = useRef()
    const confirmPasswordEl = useRef()
    const codeEl = useRef()

    const [allFieldsRequiredError, setAllFieldsRequiredError] = useState(false)
    const [notValidEmailError, setNotValidEmailError] = useState(false)
    const [emailNotFoundError, setEmailNotFoundError] = useState(false)
    const [notSamePasswordError, setNotSamePasswordError] = useState(false)
    const [notValidCodeError, setNotValidCodeError] = useState(false)
    const [serverError, setServerError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [codeSent, setCodeSent] = useState(null)
    const [emailV, setEmailV] = useState(null)
    const [passwordChanged, setPasswordChanged] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [secondSpinner, setSecondSpinner] = useState(false)


    const handleNewMailSubmission = async () => {
        setSecondSpinner(true)

        const code = Math.round((Math.random() * (999999-100000) + 100000))
        await axios.post("/api/mail/send-code-forgot", {code: code, email: emailV}, {headers: {authorization: process.env.NEXT_PUBLIC_APP_AUTHORIZATION}})
            .then(() => setCodeSent(code))
            .then(() => setSecondSpinner(false))
            .then(() => setSuccessMessage(true))
            .then(() => setTimeout(setSuccessMessage, 3000, false))

    }

    const handlePasswordSubmission = async () => {
        setNotSamePasswordError(false)
        setNotValidCodeError(false)
        setPasswordChanged(false)

        const {value: password} = passwordEl.current
        const {value: confirmPassword} = confirmPasswordEl.current
        const {value: code} = codeEl.current


        if (code != codeSent) {
            setNotValidCodeError(true)
            return
        }
        if (password != confirmPassword) {
            setNotSamePasswordError(true)
            return
        }

        setSecondSpinner(true)

        await axios.post("/api/users/new-password", {newPassword: password, email: emailV}, {headers: {authorization: process.env.NEXT_PUBLIC_APP_AUTHORIZATION}})
            .then(() => setPasswordChanged(true))
            .then(() => signIn("credentials", {email: emailV, password: password, callbackUrl:(router.query.callbackUrl ? process.env.NEXT_PUBLIC_BASE_URL+router.query.callbackUrl : process.env.NEXT_PUBLIC_BASE_URL)}))

    }

    const handleMailSubmission = async () => {
        setEmailNotFoundError(false)
        setAllFieldsRequiredError(false)
        setNotSamePasswordError(false)
        setNotValidEmailError(false)
        setServerError(false)
        setSuccess(false)

        const {value: email} = emailEl.current

        if (!email) {
            setNotSamePasswordError(true)
            return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setNotValidEmailError(true)
            return
        }

        setSpinner(true)


        let userFound = await axios.post("/api/users/check/email", {email: email}, {headers: {authorization: process.env.NEXT_PUBLIC_APP_AUTHORIZATION}})
            .then((result) => result.data.proPythonUser)
        if (!userFound) {
            setEmailNotFoundError(true)
            setSpinner(false)
            return
        }

        setEmailV(email)

        const code = Math.round((Math.random() * (999999-100000) + 100000))
        await axios.post("/api/mail/send-code-forgot", {code: code, email: email}, {headers: {authorization: process.env.NEXT_PUBLIC_APP_AUTHORIZATION}})
            .then(() => setCodeSent(code))
            .then(() => setSpinner(false))
            .then(() => setSuccess(true))
            .then(() => setSuccessMessage(true))
            .then(() => setTimeout(setSuccessMessage, 3000, false))

    }

    return (
        <div className="flex justify-start w-96 flex-col">
            <div className="flex flex-col bg-white w-auto rounded-md py-4 px-10 lg:mx-0 mx-4">
                <h1 className="text-xl font-bold border-b">Changement de mot de passe</h1>
                <span className="my-4 text-gray-500">Recevez un code par mail afin de confirmer la réinitialisation de votre mot de passe.</span>
                {!success && <div><div className="flex flex-col justify-start">
                    <div className="my-4 flex flex-col justify-start">
                        <span className="font-bold">Email</span>
                        <input
                            className="border-2 p-2 border-black rounded-md mt-2"
                            ref = {emailEl}
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                </div>
                    <div className="flex justify-center flex-col items-center">
                {notValidEmailError && <span className="font-bold text-red-500">Veuillez entrer un mail valide.</span>}
                {emailNotFoundError && <span className="font-bold text-red-500">Aucun compte avec cet email n'existe.</span>}
                    <button
                    type="button" onClick={handleMailSubmission}
                    className="w-full py-3 transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-md text-white cursor-pointer my-4"
                    >
                    Envoyer
                    </button>
                {spinner && <div className="my-4">
                    <Spinner visible={spinner}/>
                    </div>}
                    </div></div>}
                <div className="flex flex-col justify-start">

                    {successMessage && <span className="font-bold text-green-500 my-4">Le mail a bien été envoyé à l'adresse suivante : {emailV}</span>}
                    {success && <div><div className="my-2 flex flex-col">

                        <div className="my-4 flex flex-col">
                            <span className="font-bold">Code de vérification</span>
                            <input
                                className="border-2 p-2 border-black rounded-md mt-2"
                                ref = {codeEl}
                                type="text"
                                placeholder="123456"
                            />
                        </div>
                        <div className="my-4 flex flex-col">
                        <span className="font-bold">Nouveau mot de passe</span>
                        <input
                            className="border-2 p-2 border-black rounded-md mt-2"
                            ref = {passwordEl}
                            type="password"
                            placeholder="************"
                        />
                        </div>
                    </div>
                        <div className="my-4 flex flex-col">
                            <span className="font-bold">Confirmer le nouveau mot de passe</span>
                            <input
                                className="border-2 p-2 border-black rounded-md mt-2"
                                ref = {confirmPasswordEl}
                                type="password"
                                placeholder="************"
                            />
                        </div>
                        {notSamePasswordError && <span className="font-bold text-red-500">Les mots de passe ne sont pas identiques.</span>}
                        {notValidCodeError && <span className="font-bold text-red-500">Le code de vérification est incorrect.</span>}
                        <button
                            type="button" onClick={handlePasswordSubmission}
                            className="w-full py-3 transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-md text-white cursor-pointer my-4"
                        >
                            Envoyer
                        </button>
                        <div className="flex justify-end">
                                <button onClick={handleNewMailSubmission} className="cursor-pointer text-blue-700 my-4">Je n'ai pas reçu de mail</button>
                        </div>
                        {passwordChanged && <span className="font-bold text-green-500 my-4">Votre mot de passe a été changé avec succès, vous allez être reconnecté.</span>}</div>}
                        {secondSpinner && <div className="my-4 flex justify-center items-center">
                            <Spinner visible={secondSpinner}/>
                        </div>}


                </div>
            </div>
        </div>
    )

}

export default NewPasswordForm