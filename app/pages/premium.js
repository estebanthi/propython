import {Layout, PostCard} from "../components";
import React from "react";
import SideLayout from "../components/SideLayout";
import BuyCard from "../components/BuyCard";
import {getPosts, getPremiumPosts} from "../services";


const PremiumPage = ({posts}) => {

    const dispo = true

    if (dispo) {return (
        <div>
            <div className="container mx-auto px-10 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        <div className="lg:col-span-8 col-span-1">
                            <div className="bg-white shadow-lg rounded-lg p-0 p-4 lg:p-8 pb-12 mb-8">
                                <h1 className="text-3xl font-bold py-4">Devenir premium</h1>
                                <p className="text-lg font-medium font-semibold py-2">Devenir premium sur ProPython, c'est accéder à des articles exclusifs et des ressources inédites pour progresser, c'est aussi bénéficier d'un accompagnement personnalisé et de vidéos explicatives, mais c'est également soutenir le site et la création de contenus.</p>
                            </div>
                            <div className="flex justify-between flex-col-reverse lg:flex-row">
                                <BuyCard />
                                <div className="bg-white p-8 rounded-lg lg:w-1/2 lg:my-0 my-8">
                                    <h2 className="text-xl font-semibold">Pourquoi cette offre ?</h2>
                                    <p className="my-4">ProPython est un site dont la première vocation est d'enseigner des choses au grand public, c'est pourquoi je m'efforce de produire du contenu gratuit</p>
                                    <p className="my-4">En revanche, la création de contenu ainsi que la maintenance du site sont très chronophages. Proposer une option payante est donc un moyen de continuer à faire vivre le site et la création de contenu.</p>
                                </div>
                            </div>
                                <h1 className="text-3xl bg-white rounded-lg font-bold p-8 mt-20 mb-10">Les Articles Premium</h1>
                            {posts.map((post, index) => (
                                <PostCard post={post.node} key={post.title} />
                            ))}
                        </div>

                        <div className="lg:col-span-4 col-span-1">
                            <div className="lg:sticky relative top-8">
                                <SideLayout />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )}

    return <div className="px-10">
        <div className="container mx-auto px-10 mb-8 bg-white py-10 rounded-lg text-center">
            Cette page n'est pas encore disponible
        </div>
    </div>

}

export default PremiumPage


PremiumPage.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )

}


export async function getStaticProps() {
    const posts = (await getPremiumPosts()) || [];

    return {
        props: { posts }
    }
}