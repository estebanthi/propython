import Spinner from "./Spinner";
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {signIn} from "next-auth/react";
import jwt from "jsonwebtoken"
import {useRouter} from "next/router";

const VerifyForm = () => {

    const codeEl = useRef();
    const [spinner, setSpinner] = useState(false)
    const [success, setSuccess] = useState(false)
    const [wrongCodeError, setWrongCodeError] = useState(false)
    const [token, setToken] = useState(null)
    const [sendNewMessage, setSendNewMessage] = useState(false)

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [code, setCode] = useState(null)

    const router = useRouter()

    useEffect(async () => {
        const token = await JSON.parse(router.query.token)
        const verifiedToken = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SIGN)
        await setToken(verifiedToken)
        await setUsername(verifiedToken.username)
        await setEmail(verifiedToken.email)
        await setPassword(verifiedToken.password)
        await setCode(verifiedToken.code)
    }, [])

    const handleSubmission = async () => {
        setSendNewMessage(false)
        setWrongCodeError(false)
        setSpinner(true)

        if (!token) {
            setWrongCodeError(true)
            setSpinner(false)
            return
        }

        const {value: inputCode} = codeEl.current
        if (inputCode != code) {
            setWrongCodeError(true)
            setSpinner(false)
            return
        }

        const success = await axios.post("/api/users/register", {username: username, email: email, password: password})
            .then((result) => result.data.publishProPythonUser)

        setSuccess(true)
        await signIn("credentials", {email: email, password: password, callbackUrl:process.env.NEXT_PUBLIC_BASE_URL})

    }

    const sendNew = async () => {
        setSendNewMessage(false)
        setWrongCodeError(false)
        setSpinner(true)
        const newCode = Math.round((Math.random() * (999999-100000) + 100000))
        setCode(newCode)
        await axios.post("/api/mail/send-code", {code: newCode, email: email})
        setSendNewMessage(true)
        setSpinner(false)
    }

    return (
        <div className="flex lg:justify-around justify-center flex-col lg:flex-row">
            <div className="flex flex-col bg-white w-auto rounded-md py-4 px-10 lg:mx-0 mx-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold border-b">Vérification</h1>
                    <div className="flex flex-col justify-start my-4">
                        <span>Entrez ici le code que vous avez</span>
                        <span>reçu par mail afin de valider</span>
                        <span>la création de votre compte.</span>
                    </div>
                    <div className="my-4 flex flex-col">
                        <span className="font-bold">Code</span>
                        <input
                            className="border-2 p-2 border-black rounded-md mt-2"
                            ref = {codeEl}
                            type="text"
                            placeholder="123456"
                        />
                    </div>
                </div>
                <div className="flex justify-center flex-col items-center">
                    <button
                        type="button" onClick={handleSubmission}
                        className="w-full py-3 transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-md text-white cursor-pointer my-4"
                    >
                        Vérifier
                    </button>

                    <div className="flex justify-end">
                            <button onClick={sendNew} className="cursor-pointer text-blue-700">Renvoyer un email</button>
                    </div>

                    <div className="my-4">
                        <Spinner visible={spinner}/>
                    </div>
                    {wrongCodeError && <span className="font-bold text-red-500">Code incorrect.</span>}
                    {success && <span className="font-bold text-green-500">Compte vérifié avec succès !</span>}
                    {sendNewMessage && <span className="font-bold text-green-500">Un nouveau code vous a été envoyé.</span>}
                </div>
            </div>
        </div>
    )

}

export default VerifyForm