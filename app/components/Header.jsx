import React, {useContext, useEffect, useState} from "react";

import Link from "next/link";
import {getCategories} from "../services";
import {AccountCircle} from "@material-ui/icons";
import {useSession} from "next-auth/react";

import {signOut} from "next-auth/react";
import {Logout} from "@mui/icons-material";
import {useRouter} from "next/router"



const Header = () => {

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
            <div className="border-b w-full inline-block border-blue-400 py-8 flex items-center content-center justify-between">
                <div>
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            ProPython
                        </span>
                    </Link>
                </div>
                <div className="md:hidden">
                    {status != "authenticated" ? <Link href="/auth/sign-in">
                        <AccountCircle className="text-white"/>
                    </Link> : <Logout className="text-white" onClick={() => signOut()}/>}
                </div>
                <div className="hidden md:flex items-center justify-end h-20">

                    <div className="md:visible mr-10">
                        {categories.map((category) => (
                            <Link key={category} href={`/category/${category.slug}`}>
                                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div>
                        <Link href="/ressources">
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer border-2 p-2 ">
                                Ressources
                            </span>
                        </Link>
                    </div>

                    <Link href="/premium">
                    <span className="md:float-right mt-2 align-middle text-violet-300 ml-4 font-semibold border-2 border-violet-300 cursor-pointer p-2 ">
                        Premium
                    </span>
                    </Link>


                    <div>
                        {status != "authenticated" ? <Link href="/auth/sign-in">
                            <span className="md:float-right mt-2 align-middle text-yellow-400 border-yellow-400 ml-4 font-semibold cursor-pointer border-2 p-2 ">
                                Se connecter / Créer un compte
                            </span>
                        </Link> : <div className="flex justify-center flex-col text-white font-semibold ml-4">
                            <span >Connecté en tant que {<span className={session.user.isPremium ? "text-violet-300" : "text-yellow-400"}>{session.user.username}</span>}</span>
                            <button onClick={() => signOut({callbackUrl: router.asPath})} className={"md:float-right mt-2 align-middle font-semibold cursor-pointer border-2 p-2 text-yellow-400 border-yellow-400"}>Se déconnecter</button></div>}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header