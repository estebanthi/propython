import React, {useState} from "react";
import moment from "moment";
import { RichText } from '@graphcms/rich-text-react-renderer';
import Link from "next/link";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import {Switch} from "@material-ui/core";
import Toggler from "./Toggler";
import TableOfContents from "./TableOfContents";
import {WorkspacePremium} from "@mui/icons-material";




const renderClass = (children, className) => {

    switch (className) {
        case "ToggleElem":
            return (
                <div >
                    <Toggler children={children} />
                </div>
            )

        case "TableOfContents":
            return (
                <div>
                    <TableOfContents />
                </div>
            )
    }

    return (
        <div>
            {className}
        </div>
    )

}


const PostDetail = ({post}) => {


    let counter = 0

    let prerequis
    if (post.prerequis) {
        prerequis = post.prerequis.split("\n")
    }

    const getColors = () => {
        switch (post.difficulty) {
            case "Facile":
                return "border-green-700 text-green-700"
            case "Moyen":
                return "border-orange-500 text-orange-500"
            case "Difficile":
                return "border-red-600 text-red-600"
        }
    }

    const renderHeading = (children, type) => {
        let result
        switch (type) {
            case 2:
                result = <h1 className="text-3xl font-semibold mb-4"
                             id={counter}>{children}</h1>
                break
            case 3:
                result = <h2 className="text-2xl font-semibold mb-4" id={counter}>{children}</h2>
                break
            case 4:
                result = <h3 className="text-xl font-semibold mb-4" id={counter}>{children}</h3>
                break
            case 5:
                result = <h4 className="text-lg font-semibold mb-4" id={counter}>{children}</h4>
                break
        }
        counter += 1
        return result
    }

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
                    {post.difficulty ? <span className={"ml-10 border-2 px-2 rounded-3xl "+getColors()}>{post.difficulty}</span> : ""}
                    {post.premium ? <div className="text-violet-900 ml-10" data-tip="Article Premium">
                        <WorkspacePremium />
                    </div> : ""}
                </div>
                {prerequis ? <div className="bloc flex text-center items-center justify-center mb-8 w-full flex-col">
                    <span className="font-bold">Prérequis</span>
                    <div className="mt-4 flex-col flex lg:flex-row">
                        {prerequis.map((item) => {
                            return <span className="mx-2 p-2 rounded-3xl border-2 border-sky-600 text-sky-600 my-2 lg:my-0">{item}</span>
                        })}
                    </div>
                </div> : ""}
                <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
                <RichText content={post.content.raw} renderers={{
                    h1: ({children}) => <h1 className="text-3xl font-semibold mb-4">{children}</h1>,
                    h2: ({children}) => renderHeading(children, 2)
                    ,
                    h3: ({children}) => renderHeading(children, 3),
                    h4: ({children}) => renderHeading(children, 4),
                    h5: ({children}) => renderHeading(children, 5),
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
                    class: ({children, className}) => {
                        return renderClass(children, className)
                    },
                    img: ({src}) => <img className="mb-4" src={src}></img>,
                }}/>
            </div>
        </div>
    )
}

export default PostDetail