import React from "react";

import Link from "next/link"


const PremiumWidget = () => {

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 pb-12 mb-8">
            <h1 className="text-xl mb-8 font-semibold border-b pb-4 border-pink-600">Premium - 3.99€/mois</h1>
            <div>
                L'accès à <span className="text-pink-600">des articles inédits</span>, à <span className="text-pink-600">une multitude de ressources</span>, à <span className="text-pink-600">de nouveaux projets</span>, découvrez ici pourquoi passer premium.
            </div>
            <div className="flex justify-center mt-4">
                <Link href="/premium">
                    <button className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                        En savoir plus
                    </button>
                </Link>
            </div>
        </div>
    )

}


export default PremiumWidget