import React, {useState, useEffect, useRef} from "react";
import {submitComment} from "../services";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Spinner from "./Spinner";

const CommentsForm = ({slug}) => {

    const { data: session, status } = useSession()
    const router = useRouter()

    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const [spinner, setSpinner] = useState(false)


    const handleCommentSubmission = async () => {
        setError(false);
        setSpinner(false)

        const { value: comment } = commentEl.current;

        if(!comment) {
            setError(true);
            return;
        }

        await setSpinner(true)

        const commentObj = {comment: comment, slug: slug, userId:session.user.id};

        await submitComment(commentObj)
            .then((res) => {
                setSpinner(false)
                setShowSuccessMessage(true);

                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            })

    }

    if (status != "authenticated") {
        return (
            <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                <h1 className="text-xl mb-8 font-semibold border-b pb-4">Laisser un commentaire</h1>
                <button
                    type="button" onClick={() => {
                    router.push({pathname: "/auth/sign-in", query: {callbackUrl: router.asPath}})
                }}
                    className="ml-3 transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Se connecter
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h1 className="text-xl mb-8 font-semibold border-b pb-4">Laisser un commentaire</h1>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea ref={commentEl}
                          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                          placeholder="Commentaire"
                          name="comment"
                />
            </div>
            {error && <p className="text-md text-red-500">Commentaire vide.</p>}
            <div className="mt-8 flex items-center">

                <button
                    type="button" onClick={handleCommentSubmission}
                    className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Envoyer
                </button>
                {spinner ? <div className="ml-5"><Spinner /></div> : ""}
                {showSuccessMessage && <span className="text-xl ml-5 font-semibold text-green-500">Commentaire envoyé !</span>}
            </div>
        </div>

    )
}

export default CommentsForm