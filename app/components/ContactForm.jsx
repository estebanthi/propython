import React, {useState, useEffect, useRef} from "react";
import {submitComment, submitMessage} from "../services";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Spinner from "./Spinner";

const ContactForm = () => {

    const { data: session, status } = useSession()
    const router = useRouter()

    const [message, setMessage] = useState("")

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const handleSubmission = async () => {
        setSpinner(false)
        setError(false);

        if (!message) {
            setError(true);
            return;
        }

        setSpinner(true)

        const messageObj = {message: message, userId:session.user.id, username: session.user.username, email: session.user.email};

        await submitMessage(messageObj)
            .then((res) => {
                setSuccess(true);
                setSpinner(false)

                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            })
            .then(() => setMessage(""))
            .catch((err) => console.log(err))
    }

    if (status != "authenticated") {
        return (
            <div className="flex flex-col">
                Se connecter pour envoyer un message directement depuis le site.
                <button
                    type="button" onClick={() => {
                    router.push({pathname: "/auth/sign-in", query: {callbackUrl: router.asPath}})
                }}
                    className="mt-4 transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Se connecter
                </button>
            </div>
        )
    }

    return (
        <div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="my-2 p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                placeholder="Message"
                name="message"
            />
            {error && <div className="mb-2"><span className="text-xs text-red-500">Veuillez remplir tous les champs.</span></div>}
            {success && <div className="mb-2"><span className="text-xl text-green-500 font-semibold">Bien reçu ! Vous recevrez une réponse par mail prochainement.</span></div>}
                <div className="flex justify-center items-center">
                    <div className="flex-1"></div>
                    <button
                        onClick={handleSubmission}
                        type="button"
                        className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                    >
                        Envoyer
                    </button>
                    {spinner ? <div className="flex-1 flex justify-center"><Spinner /></div> : <div className="flex-1"></div>}
                </div>

        </div>
    )
}

export default ContactForm