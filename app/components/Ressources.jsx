import React from 'react';
import Link from "next/link";

const Ressources = () => {

    const handleSubmission = () => {

    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h1 className="text-xl mb-8 font-semibold border-b pb-4">Ressources</h1>
            <div>
                Retrouvez une collection de ressources (des scripts, des fiches résumé, des images...) liées aux articles du blog ou au Python.
            </div>
            <div className="mt-8 flex justify-center">
                <Link href={"/ressources"}>
                      <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                          Voir
                      </span>
                </Link>

            </div>
        </div>

    );
};

export default Ressources;