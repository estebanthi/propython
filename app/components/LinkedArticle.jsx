import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import {getRecentPosts, getSimilarPosts} from "../services";

const LinkedArticle = ({post}) => {

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="transition duration-700 text-left cursor-pointer hover:text-pink-600 text-xl font-semibold">
               Article lié
            </h3>

                <div key={post.title} className="flex items-center w-full mt-5">
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
                            {post.title}
                        </Link>
                    </div>
                </div>
        </div>
    )
}

export default LinkedArticle