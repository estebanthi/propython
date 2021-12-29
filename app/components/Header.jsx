import React, {useContext, useEffect, useState} from "react";

import Link from "next/link";
import {getCategories} from "../services";
import {AccountCircle} from "@material-ui/icons";
import {SignedOut, SignInButton, SignedIn} from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import SignOutButton from "./SignOutButton";

const Header = () => {

    const [categories, setCategories] = useState([]);


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
                    <SignInButton modal>
                        <AccountCircle className="text-white"/>
                    </SignInButton>
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

                    <div>
                        <SignedOut>
                        <SignInButton modal>
                            <button className="md:float-right mt-2 align-middle text-yellow-400 border-yellow-400 ml-4 font-semibold cursor-pointer border-2 p-2 ">
                                Se connecter / Créer un compte
                            </button>
                        </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="md:float-right mt-2 align-middle ml-4 ">
                            <SignOutButton />
                            </div>
                        </SignedIn>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Header