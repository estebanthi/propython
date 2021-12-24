import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import {getRecentPosts, getSimilarPosts} from "../services";

const PostWidget = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(
        () => {
            if(slug) {
                getSimilarPosts(categories, slug)
                    .then((result) => setRelatedPosts(result))
            } else {
                getRecentPosts()
                    .then((result) => setRelatedPosts(result))
            }
        }, [slug]
    )
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h1 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? "Articles liés" : "Articles récents"}
            </h1>
            {relatedPosts.map((post) => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <img
                            alt={post.title}
                            height="60px"
                            width="60px"
                            className="align-middle rounded-full"
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p>
                        {moment(post.createdAt).format("DD MMM, YYYY")}
                        </p>
                        <Link href={`/post/${post.slug}`} className="text-md" key={post.title}>
                            <span onClick={() => {
                                analytics.track({
                                    anonymousId: '48d213bb-95c3-4f8d-af97-86b2b404dcfe',
                                    event: 'Post viewed',
                                    properties: {
                                        post: post.slug
                                    }
                                })
                            }} className="cursor-pointer">{post.title}</span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget