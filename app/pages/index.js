import Head from 'next/head'
import {PostCard, Categories, PostWidget, Layout} from "../components";
import { getPosts } from "../services";
import FeaturedPosts from "../sections/FeaturedPosts";
import Ressources from "../components/Ressources";
import Contact from "../components/Contact";
import React from "react";
import PostDetails from "./post/[slug]";
import PremiumWidget from "../components/PremiumWidget";
import SideLayout from "../components/SideLayout";

export default function Home({ posts }) {

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>ProPython</title>
          <meta name="description" content="Retrouvez sue ProPython tout ce dont vous avez besoin pour apprendre le Python. Que vous soyez débutant ou expert, vous trouverez ici tout type de contenu !"/>
        <link rel="icon" href="https://media.graphcms.com/OYRgW8aSKuiUBJTEehZA" />
      </Head>
        <FeaturedPosts />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div className="lg:col-span-8 col-span-1">
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
  )
}

export async function getStaticProps() {
    const posts = (await getPosts()) || [];

    return {
        props: { posts }
    }
}


Home.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )

}