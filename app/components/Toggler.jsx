import {Switch} from "@material-ui/core";
import {RichText} from "@graphcms/rich-text-react-renderer";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import {ocean} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import React, {useState} from "react";


const Toggler = (props) => {


    const [value, setValue] = useState(false)


    const handleChange = () => {
        setValue(!value)
    }

    const children = props.children
    const content = children.props.content
    let richContent = children.props.content
    let title
    if (content[0].type == "heading-one") {
        title = content[0].children[0].text
        richContent = content.slice()
        richContent.shift()
    }

    return (
        <div>
            {title ? <span className="font-bold">{title}</span> : ""}
            <Switch onChange={handleChange} checked={value}
            sx={{color: "#8796A5"}}/>
            {value ? <RichText content={richContent} renderers={{
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
                class: ({children, className}) => {
                    return renderClass(children, className)
                },
            }}/> : ""}
        </div>
    )

}

export default Toggler
