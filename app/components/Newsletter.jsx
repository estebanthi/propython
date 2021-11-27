import React, {useRef, useState} from 'react';
import {submitUser} from "../services";

const Newsletter = () => {

    const [error, setError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const acceptEl = useRef();
    const emailEl = useRef();

    const handleSubmission = () => {

        setError(false);

        const { value: email } = emailEl.current;
        const { value: accept } = acceptEl.current;

        if(!email || !accept) {
            setError(true);
            return;
        }

        const userObj = {email};

        submitUser(userObj)
            .then((res) => {
                setShowSuccessMessage(true);

                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            })

    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Newsletter</h3>
            <div className="gap-4 mb-4">
                <input
                    type="text" ref={emailEl}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input ref={acceptEl} type="checkbox" id="accept" name="accept" value="true"/>
                    <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">J'accepte de recevoir des e-mails de la part de ProPython.</label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">Tous les champs sont requis.</p>}
            <div className="mt-8 flex justify-center">
                <button
                    type="button" onClick={handleSubmission}
                    className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Envoyer
                </button>

            </div>
            {showSuccessMessage && <span className="text-xl flex justify-center font-semibold mt-3 text-green-500">E-mail reçu !</span>}
        </div>

    );
};

export default Newsletter;