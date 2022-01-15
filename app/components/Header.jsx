import React, {useContext, useEffect, useState} from "react";

import Link from "next/link";
import {getCategories} from "../services";
import {AccountCircle} from "@material-ui/icons";
import {useSession} from "next-auth/react";

import {signOut} from "next-auth/react";
import {Logout, WorkspacePremium} from "@mui/icons-material";
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
                <div className="flex md:hidden items-center text-violet-300">
                    <div className="flex border-2 border-violet-300 mx-4 items-center content-center p-2">
                    <div className="">
                        {<Link href="/premium">
                            <WorkspacePremium/>
                        </Link>}
                    </div>
                    <div>
                        {session ? (session.user.isPremium ? <div>
                                    <span
                                        className="font-bold">{" " + new Date(session.user.premiumExpiration).getDate().toString() + "/" + new Date(session.user.premiumExpiration).getMonth() + "/" + new Date(session.user.premiumExpiration).getFullYear()}</span>
                        </div> : null ) : null}
                    </div>
                    </div>
                <div>
                    {status != "authenticated" ? <Link href={{pathname: "/auth/sign-in", query: {callbackUrl: router.asPath}}}>
                        <AccountCircle className="text-white"/>
                    </Link> : <Logout className="text-white" onClick={() => signOut()}/>}
                </div>
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
                        <Link href="/ressources">
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer border-2 p-2 ">
                                Ressources
                            </span>
                        </Link>

                    <Link href="/premium">
                    <span className="md:float-right mt-2 align-middle text-violet-300 ml-4 font-semibold border-2 border-violet-300 cursor-pointer p-2 ">
                        Premium
                    </span>
                    </Link>


                    <div>
                        {status != "authenticated" ? <Link href={{pathname: "/auth/sign-in", query: {callbackUrl: router.asPath}}}>
                            <span className="md:float-right mt-2 align-middle text-yellow-400 border-yellow-400 ml-4 font-semibold cursor-pointer border-2 p-2 ">
                                Se connecter / Créer un compte
                            </span>
                        </Link> : <div className="flex justify-center flex-col text-white font-semibold ml-4">
                            <span >Connecté en tant que {<span className={session.user.isPremium ? "text-violet-300" : "text-yellow-400"}>{session.user.username}</span>}</span>
                            {session.user.isPremium ? (session.user.premiumExpiration != "unlimited" ? <div>
                                <span>
                                Premium jusqu'au
                                    <span
                                        className="text-violet-300">{" " + new Date(session.user.premiumExpiration).getDate().toString() + "/" + new Date(session.user.premiumExpiration).getMonth() + "/" + new Date(session.user.premiumExpiration).getFullYear()}</span>
                                    </span>
                            </div> : <div className="text-center">
                                <span>
                                Premium
                                    <span
                                        className="text-violet-300"> illimité</span>
                                    </span>
                            </div>) : null}
                            <button onClick={() => signOut({callbackUrl: router.asPath})} className={"md:float-right mt-2 align-middle font-semibold cursor-pointer border-2 p-2 text-yellow-400 border-yellow-400"}>Se déconnecter</button></div>}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header