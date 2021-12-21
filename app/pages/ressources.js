import {getRessources} from "../services";
import Head from "next/head";
import FeaturedPosts from "../sections/FeaturedPosts";
import {Categories, Newsletter, PostCard, PostWidget} from "../components";
import Ressources from "../components/Ressources";
import RessourceCard from "../components/RessourceCard";
import Link from "next/link";
import React from "react";

const RessourcesPage = ({ressources}) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>ProPython - Ressources</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
                    {ressources.map((ressource, index) => (
                        <RessourceCard ressource={ressource} key={ressource.title} />
                    ))}
        </div>
    )
}


export async function getStaticProps() {
    const ressources = (await getRessources()) || [];

    return {
        props: { ressources }
    }
}

export default RessourcesPage


