import React from "react";
import Link from "next/link"
import {useFocused, useSelected, useSlateStatic} from "slate-react";
import removeLink from "../../helpers/editor/link";

const CodeElement = props => {
    return (
        <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
    )
}

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

const HeadingOneElement = props => {
    return (
        <h1 className="text-3xl font-semibold mb-4" {...props.attributes}>
            {props.children}
        </h1>
    )
}

const HeadingTwoElement = props => {
    return (
        <h1 className="text-2xl font-semibold mb-4" {...props.attributes}>
            {props.children}
        </h1>
    )
}

const HeadingThreeElement = props => {
    return (
        <h1 className="text-xl font-semibold mb-4" {...props.attributes}>
            {props.children}
        </h1>
    )
}

const HeadingFourElement = props => {
    return (
        <h1 className="text-lg font-semibold mb-4" {...props.attributes}>
            {props.children}
        </h1>
    )
}

const HeadingFiveElement = props => {
    return (
        <h1 className="text-md font-semibold mb-4" {...props.attributes}>
            {props.children}
        </h1>
    )
}

const HeadingSixElement = props => {
    return (
        <h1 className="text-sm font-semibold mb-4" {...props.attributes}>
            {props.children}
        </h1>
    )
}

const LinkElement = ({ attributes, element, children }) => {
    const editor = useSlateStatic();
    const selected = useSelected();
    const focused = useFocused();

    return (
            <div {...attributes} href={element.href} className="text-blue-500 inline">
                {children}
            </div>
    );
};

const Leaf = props => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal',
                fontStyle: props.leaf.italic ? 'italic' : 'normal',
                textDecoration: props.leaf.underline ? 'underline' : 'normal',
            }}
        >
      {props.children}
    </span>
    )
}

module.exports = {
    CodeElement: CodeElement,
    DefaultElement: DefaultElement,
    HeadingOneElement : HeadingOneElement,
    HeadingFourElement : HeadingFourElement,
    HeadingFiveElement: HeadingFiveElement,
    HeadingThreeElement: HeadingOneElement,
    HeadingSixElement: HeadingSixElement,
    HeadingTwoElement: HeadingTwoElement,
    LinkElement: LinkElement,
    Leaf : Leaf,

}