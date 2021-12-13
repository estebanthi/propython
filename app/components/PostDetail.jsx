import React from "react";
import moment from "moment";
import { RichText } from '@graphcms/rich-text-react-renderer';
import Link from "next/link";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/dist/cjs/styles/hljs';


const PostDetail = ({post}) => {

    return (
        <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md mb-6">
                <img
                src={post.featuredImage.url}
                alt={post.title}
                className="object-top h-full w-full rounded-t-lg"
                />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex items-center mb-8 w-full">
                    <div className="font-medium text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                        {moment(post.createdAt).format("DD MMM, YYYY")}
                    </span>
                    </div>

                </div>
                <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
                <RichText content={post.content.raw} renderers={{
                    h1: ({children}) => <h1 className="text-3xl font-semibold mb-4">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-semibold mb-4">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-semibold mb-4">{children}</h3>,
                    h4: ({children}) => <h4 className="text-lg font-semibold mb-4">{children}</h4>,
                    h5: ({children}) => <h4 className="text-base font-semibold mb-4">{children}</h4>,
                    p: ({children}) => <p className="mb-8">{children}</p>,
                    code: ({children}) => <code className="bg-gray-100 rounded-md text-red-500">{children}</code>,
                    ul: ({children}) => <ul class="list-disc ml-4">{children}</ul>,
                    ol: ({children}) => <ul class="list-decimal ml-4">{children}</ul>,
                    li: ({children}) => <li className="mb-4">{children}</li>,
                    blockquote: ({children}) => (<div className="mb-4 border-l-4 border-gray-500"><blockquote className="ml-2 italic">{children}</blockquote></div>),
                    a: ({children, href}) => {
                        return (<Link href={href}>
                            <a className="text-blue-500">{children}</a>
                        </Link>)
                    },
                    code_block: ({children}) => {
                        const code = children.props.content[0].text
                        return <SyntaxHighlighter
                            language="python"
                            style={ocean}
                            className="rounded-md mb-4"
                        >{code}</SyntaxHighlighter>
                    },
                }}/>
            </div>
        </div>
    )
}

export default PostDetail