import React, {useState, useEffect, useRef} from "react";
import {submitComment, submitMessage} from "../services";

const ContactForm = () => {

    const nameEl = useRef()
    const mailEl = useRef()
    const messageEl = useRef()

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmission = () => {
        setError(false);

        const {value: name} = nameEl.current;
        const {value: mail} = mailEl.current;
        const {value: message} = messageEl.current;

        if (!message || !name || !mail) {
            setError(true);
            return;
        }

        const messageObj = {name, mail, message};

        submitMessage(messageObj)
            .then((res) => {
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            })
    }

    return (
        <div>
            <input
                ref={nameEl}
                type="text"
                className="my-2 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                placeholder="Nom"
                name="name"
            />
            <input
                ref={mailEl}
                type="text"
                className="my-2 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                placeholder="Mail"
                name="mail"
            />
            <textarea
                ref={messageEl}
                      className="my-2 p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                      placeholder="Message"
                      name="message"
            />
            {error && <div className="mb-2"><span className="text-red-700">Veuillez remplir tous les champs.</span></div>}
            {success && <div className="mb-2"><span className="text-green-700">Bien reçu ! Vous recevrez une réponse par mail prochainement.</span></div>}
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