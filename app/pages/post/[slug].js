import React from "react";
import { useRouter } from "next/router";

import {getPosts, getPostDetails, getPostsDetails} from "../../services";
import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader, Newsletter} from "../../components";

import Head from 'next/head'


var Analytics = require('analytics-node');
var analytics = new Analytics(process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY);

const PostDetails = ({post}) => {

    const router = useRouter();

    if(router.isFallback) {
        return <Loader />
    }
    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>{post.title}</title>
            </Head>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post}/>
                    <CommentsForm slug={post.slug}/>
                    <Comments slug={post.slug}/>
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)}/>
                        <Categories />
                        <Newsletter />
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