import React from 'react';
import { useRouter } from 'next/router';

import {getCategories, getCategoryPost, getGroups} from '../../services';
import {PostCard, Categories, Loader, Layout} from '../../components';
import Home from "../index";
import SideLayout from "../../components/SideLayout";
import GroupCard from "../../components/GroupCard";

const CategoryPost = ({ posts, groups }) => {

    const soloPosts = posts.filter((post) => {
        const found = groups.map((group) => {
            const titleValues = group.node.posts.map(({title}) => title)
            if (titleValues.includes(post.node.title)) {
                return true
            }
        })
        return !found[0]
    })




    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">

                    {posts.map((post, index) => (
                        <PostCard key={index} post={post.node} />
                    ))}
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
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
    const posts = await getCategoryPost(params.slug);
    const groups = await getGroups(params.slug)
    return {
        props: { posts, groups },
    };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
    const categories = await getCategories();
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
}


CategoryPost.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )

}