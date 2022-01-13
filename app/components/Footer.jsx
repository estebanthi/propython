import React, {useContext, useEffect, useState} from "react";

import Link from "next/link";
import {getCategories} from "../services";
import {AccountCircle} from "@material-ui/icons";
import {useSession} from "next-auth/react";

import {signOut} from "next-auth/react";
import {Logout} from "@mui/icons-material";
import {useRouter} from "next/router"


const Footer = () => {

    const [categories, setCategories] = useState([]);
    const { data: session, status } = useSession()

    const router = useRouter()


    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        });
    }, []);

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-t w-full inline-block border-blue-400 py-8 flex justify-around">
                <div className="flex flex-col">
                    <h1 className="text-xl text-white font-bold">Navigation</h1>
                    <Link href="/">
                        <span className="mt-2 align-middle text-white cursor-pointer">
                            Accueil
                        </span>
                    </Link>
                    <Link href="/auth/sign-in">
                        <span className="mt-2 align-middle text-white cursor-pointer">
                            Se connecter
                        </span>
                    </Link>
                    <Link href="/auth/sign-up">
                        <span className="mt-2 align-middle text-white cursor-pointer">
                            Créer un compte
                        </span>
                    </Link>
                    <Link href="/ressources">
                        <span className="mt-2 align-middle text-white cursor-pointer">
                            Ressources
                        </span>
                    </Link>
                    <Link href="/premium">
                        <span className="mt-2 align-middle text-white cursor-pointer">
                            Premium
                        </span>
                    </Link>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl text-white font-bold">Catégories</h1>
                    {categories.map((category) => (
                        <Link key={category} href={`/category/${category.slug}`}>
                                <span className="mt-2 align-middle text-white cursor-pointer">
                                    {category.name}
                                </span>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl text-white font-bold">Pages légales</h1>
                    <Link href="/legal/politique-de-confidentialite">
                        <span className="mt-2 align-middle text-white cursor-pointer">
                            Politique de confidentialité
                        </span>
                    </Link>
                    <Link href="/legal/mentions-legales">
                        <span className="mt-2 align-middle text-white cursor-pointer">
                            Mentions légales
                        </span>
                    </Link>
                    <Link href="/legal/conditions-generales-de-vente">
                        <span className="mt-2 align-middle text-white cursor-pointer">
                            Conditions générales de vente
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Footer