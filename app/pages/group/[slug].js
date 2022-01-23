import React from 'react';
import { useRouter } from 'next/router';

import {getCategories, getCategoryPost, getGroups, getGroupsPaths, getGroupsPosts} from '../../services';
import {PostCard, Categories, Loader, Layout} from '../../components';
import Home from "../index";
import SideLayout from "../../components/SideLayout";
import GroupCard from "../../components/GroupCard";
import Head from "next/head";

const GroupPost = ({ posts, slug }) => {


    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <link rel="icon" href="https://media.graphcms.com/OYRgW8aSKuiUBJTEehZA" />
                <title>
                    {(slug.split('-')
                        .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
                        .join(' '))+" - ProPython"}
                </title>
            </Head>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    {posts.map((post, index) => <PostCard key={index} post={post}/>
                    )}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <SideLayout />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GroupPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
    const posts = await getGroupsPosts(params.slug);
    const slug = params.slug
    return {
        props: { posts, slug },
    };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
    const groups = await getGroupsPaths();
    return {
        paths: groups.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
}


GroupPost.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )

}