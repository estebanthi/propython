import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";

import {getPosts, getPostDetails, getPostsDetails, getGroups, getPreviousNextPosts} from "../../services";
import {
    PostDetail,
    Categories,
    PostWidget,
    Author,
    Comments,
    CommentsForm,
    Loader,
    Layout
} from "../../components";

import Head from 'next/head'
import TableOfContents from "../../components/TableOfContents";
import ContactForm from "../../components/ContactForm";
import Contact from "../../components/Contact";
import PremiumWidget from "../../components/PremiumWidget";
import Ressources from "../../components/Ressources";
import SideLayout from "../../components/SideLayout";
import {getSession, useSession} from "next-auth/react";
import PreviousNextArticles from "../../components/PreviousNextArticles";


var Analytics = require('analytics-node');
var analytics = new Analytics(process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY);

const PostDetails = ({post}) => {

    const [session, setSession] = useState(null)
    const router = useRouter();
    useEffect(async () => {
        const sessionGot = await getSession()
        if (post.premium) {
            if (!sessionGot) {
                router.push({pathname: "/auth/sign-in", query: {callbackUrl: router.asPath}})
                return
            }
            if (!sessionGot.user.isPremium) {
                router.push("/premium")
                return
            }
        }
    }, [])

    if(router.isFallback) {
        return <Loader />
    }
    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt}/>
                <link rel="icon" href="https://media.graphcms.com/OYRgW8aSKuiUBJTEehZA" />
            </Head>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post}/>
                    <PreviousNextArticles slug={post.slug} />
                    <CommentsForm slug={post.slug}/>
                    <Comments slug={post.slug}/>
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <SideLayout post={post} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PostDetails

export async function getStaticProps({params}) {
    const data = await getPostsDetails(params.slug)

    return {
        props: { post: data }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts();

    return {
        paths: posts.map(({node: {slug }}) => ({params: {slug}})),
        fallback: true,
    }
}


PostDetails.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )

}