import React, {useState, useEffect, useRef} from "react";
import {submitComment, submitMessage} from "../services";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

const ContactForm = () => {

    const { data: session, status } = useSession()
    const router = useRouter()

    const messageEl = useRef()

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmission = () => {
        setError(false);

        const {value: name} = nameEl.current;

        if (!message) {
            setError(true);
            return;
        }

        const messageObj = {name, email, message};

        submitMessage(messageObj)
            .then((res) => {
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            })
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
                ref={messageEl}
                className="my-2 p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                placeholder="Message"
                name="message"
            />
            {error && <div className="mb-2"><span className="text-xs text-red-500">Veuillez remplir tous les champs.</span></div>}
            {success && <div className="mb-2"><span className="text-xl text-green-500 font-semibold">Bien reçu ! Vous recevrez une réponse par mail prochainement.</span></div>}
            <div className="flex justify-center">
                <button
                    onClick={handleSubmission}
                    type="button"
                    className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Envoyer
                </button>
            </div>
        </div>
    )
}

export default ContactForm