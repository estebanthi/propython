import React, {useCallback, useState} from "react";
import {withReact, Slate, Editable} from "slate-react";
import {createEditor, Transforms, Editor, Text} from "slate";
import {
    FontDownload, FormatBold, FormatBoldOutlined, FormatItalic, FormatUnderlined,
    HighlightOff, HighlightOffOutlined, InsertLink,
    Looks3,
    Looks3Outlined,
    Looks4, Looks4Outlined,
    Looks5, Looks5Outlined,
    Looks6, Looks6Outlined,
    LooksOne, LooksOneOutlined,
    LooksTwo, LooksTwoOutlined
} from "@material-ui/icons";
import Popup from "reactjs-popup";
import Link from "next/link"
import CustomEditor from "./Editor/CustomEditor";
import {Leaf, HeadingTwoElement, HeadingOneElement, HeadingSixElement, HeadingFiveElement, HeadingThreeElement, HeadingFourElement, DefaultElement, CodeElement, LinkElement} from "./Editor/elements"
import insertLink from "../helpers/editor/link";


const EditorComponent = () => {

    const countWords = content => {
        let count = 0;
        content.forEach(value => {
            let s = value['children'][0]['text'];
            if (s) {
                if (s.length != 0 && s.match(/\b[-?(\w+)?]+\b/gi)) {
                    s = s.replace(/(^\s*)|(\s*$)/gi, "");
                    s = s.replace(/[ ]{2,}/gi, " ");
                    s = s.replace(/\n /, "\n");
                    count += s.split(' ').length;
                }
            }
        });
        return count;
    }
    const countChars = content => {
        let count = content.length > 1 ? content.length - 1 : 0;
        content.forEach(value => {
            if (value['children'][0]['text']) {
                count += value['children'][0]['text'].length;
            }
        });
        return count;
    }

    const [editor] = useState(() => withReact(createEditor()))
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ])
    const [headingSelected, setHeadingSelected] = useState(0)

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            case 'heading-one':
                return <HeadingOneElement {...props} />
            case 'heading-two':
                return <HeadingTwoElement {...props} />
            case 'heading-three':
                return <HeadingThreeElement {...props} />
            case 'heading-four':
                return <HeadingFourElement {...props} />
            case 'heading-five':
                return <HeadingFiveElement {...props} />
            case 'heading-six':
                return <HeadingSixElement {...props} />
            case 'link':
                return <LinkElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return (
        <div>
            <div className="bg-white shadow-lg rounded-lg px-8 py-4 mb-2 sticky top-0 flex">
                <div className="border-r-2 border-black px-2">
                    {headingSelected == 0 ? <HighlightOff className="text-blue-500 cursor-pointer"/> : <HighlightOff className="cursor-pointer hover:text-blue-500" onClick={() => {
                        setHeadingSelected(0)
                        CustomEditor.updateHeadingBlock(editor, 0)
                    }}/>}
                    {headingSelected == 1 ? <LooksOne className="cursor-pointer"/> : <LooksOneOutlined className="cursor-pointer hover:text-blue-500" onClick={() => {
                        setHeadingSelected(1)
                        CustomEditor.updateHeadingBlock(editor, 1)
                    }}/>}
                    {headingSelected == 2 ? <LooksTwo className="cursor-pointer"/> : <LooksTwoOutlined className="cursor-pointer hover:text-blue-500" onClick={() => {
                        setHeadingSelected(2)
                        CustomEditor.updateHeadingBlock(editor, 2)
                    }}/>}
                    {headingSelected == 3 ? <Looks3 className="cursor-pointer"/> : <Looks3Outlined className="cursor-pointer hover:text-blue-500" onClick={() => {
                        setHeadingSelected(3)
                        CustomEditor.updateHeadingBlock(editor, 3)
                    }}/>}
                    {headingSelected == 4 ? <Looks4 className="cursor-pointer"/> : <Looks4Outlined className="cursor-pointer hover:text-blue-500" onClick={() => {
                        setHeadingSelected(4)
                        CustomEditor.updateHeadingBlock(editor, 4)
                    }}/>}
                    {headingSelected == 5 ? <Looks5 className="cursor-pointer"/> : <Looks5Outlined className="cursor-pointer hover:text-blue-500" onClick={() => {
                        setHeadingSelected(5)
                        CustomEditor.updateHeadingBlock(editor, 5)
                    }}/>}
                    {headingSelected == 6 ? <Looks6 className="cursor-pointer"/> : <Looks6Outlined className="cursor-pointer hover:text-blue-500" onClick={() => {
                        setHeadingSelected(6)
                        CustomEditor.updateHeadingBlock(editor, 6)
                    }}/>}
                </div>
                <div className="border-r-2 border-black px-2">
                    <FormatBold className="cursor-pointer hover:text-blue-500" onClick={() => {
                        CustomEditor.toggleBoldMark(editor)
                    }
                    }/>
                    <FormatItalic className="cursor-pointer hover:text-blue-500" onClick={() => {
                        CustomEditor.toggleItalicMark(editor)}
                    }/>
                    <FormatUnderlined className="cursor-pointer hover:text-blue-500" onClick={() => {
                        CustomEditor.toggleUnderlineMark(editor)}
                    }/>
                </div>
                <div className="border-r-2 border-black px-2">
                    <InsertLink onClick={() => {
                        const url = prompt("Addresse du lien : ")
                        insertLink(editor, url)
                    }}/>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">

                <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}

                    />
                </Slate>

            </div>
            <div className="bg-white">
                Mots : {countWords(value)}
                Caractères : {countChars(value)}
            </div>
        </div>
    )

}

export default EditorComponent

