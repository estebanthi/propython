import React, {useCallback, useState} from "react";
import {withReact, Slate, Editable} from "slate-react";
import {createEditor, Transforms, Editor, Text} from "slate";
import {
    FontDownload,
    HighlightOff, HighlightOffOutlined,
    Looks3,
    Looks3Outlined,
    Looks4, Looks4Outlined,
    Looks5, Looks5Outlined,
    Looks6, Looks6Outlined,
    LooksOne, LooksOneOutlined,
    LooksTwo, LooksTwoOutlined
} from "@material-ui/icons";


const CustomEditor = {
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold === true,
            universal: true,
        })

        return !!match
    },

    isItalicMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.italic === true,
            universal: true,
        })

        return !!match
    },

    isUnderlineMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.underline === true,
            universal: true,
        })
        return !!match
    },

    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
        })

        return !!match
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleItalicMark(editor) {
        const isActive = CustomEditor.isItalicMarkActive(editor)
        console.log(editor)
        Transforms.setNodes(
            editor,
            { italic: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleUnderlineMark(editor) {
        const isActive = CustomEditor.isUnderlineMarkActive(editor)
        Transforms.setNodes(
            editor,
            { underline: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor)
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'code' },
            { match: n => Editor.isBlock(editor, n) }
        )
    },

    updateHeadingBlock(editor, selected) {
        let heading = null
        switch (selected) {
            case 0:
                heading = null
                break
            case 1:
                heading = 'heading-one'
                break
            case 2:
                heading = 'heading-two'
                break
            case 3:
                heading = 'heading-three'
                break
            case 4:
                heading = 'heading-four'
                break
            case 5:
                heading = 'heading-five'
                break
            case 6:
                heading = 'heading-six'
                break
            default:
                heading = null
                break
        }
        Transforms.setNodes(
            editor,
            { type: heading },
            { match: n => Editor.isBlock(editor, n) }
        )
    },
}


const EditorComponent = () => {

    const countWords = content => {
        let count = 0;
        content.forEach(value => {
            let s = value['children'][0]['text'];
            if (s.length != 0 && s.match(/\b[-?(\w+)?]+\b/gi)) {
                s = s.replace(/(^\s*)|(\s*$)/gi, "");
                s = s.replace(/[ ]{2,}/gi, " ");
                s = s.replace(/\n /, "\n");
                count += s.split(' ').length;
            }
        });
        return count;
    }
    const countChars = content => {
        let count = content.length > 1 ? content.length - 1 : 0;
        content.forEach(value => {
            count += value['children'][0]['text'].length;
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
                    {headingSelected == 0 ? <HighlightOff className="text-blue-500 cursor-pointer"/> : <HighlightOff className="cursor-pointer" onClick={() => {
                        setHeadingSelected(0)
                        CustomEditor.updateHeadingBlock(editor, 0)
                    }}/>}
                    {headingSelected == 1 ? <LooksOne className="cursor-pointer"/> : <LooksOneOutlined className="cursor-pointer" onClick={() => {
                        setHeadingSelected(1)
                        CustomEditor.updateHeadingBlock(editor, 1)
                    }}/>}
                    {headingSelected == 2 ? <LooksTwo className="cursor-pointer"/> : <LooksTwoOutlined className="cursor-pointer" onClick={() => {
                        setHeadingSelected(2)
                        CustomEditor.updateHeadingBlock(editor, 2)
                    }}/>}
                    {headingSelected == 3 ? <Looks3 className="cursor-pointer"/> : <Looks3Outlined className="cursor-pointer" onClick={() => {
                        setHeadingSelected(3)
                        CustomEditor.updateHeadingBlock(editor, 3)
                    }}/>}
                    {headingSelected == 4 ? <Looks4 className="cursor-pointer"/> : <Looks4Outlined className="cursor-pointer" onClick={() => {
                        setHeadingSelected(4)
                        CustomEditor.updateHeadingBlock(editor, 4)
                    }}/>}
                    {headingSelected == 5 ? <Looks5 className="cursor-pointer"/> : <Looks5Outlined className="cursor-pointer" onClick={() => {
                        setHeadingSelected(5)
                        CustomEditor.updateHeadingBlock(editor, 5)
                    }}/>}
                    {headingSelected == 6 ? <Looks6 className="cursor-pointer"/> : <Looks6Outlined className="cursor-pointer" onClick={() => {
                        setHeadingSelected(6)
                        CustomEditor.updateHeadingBlock(editor, 6)
                    }}/>}
                </div>
            </div>
        <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">

            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        if (!event.ctrlKey) {
                            return
                        }

                        // Replace the `onKeyDown` logic with our new commands.
                        switch (event.key) {
                            case '-': {
                                event.preventDefault()
                                CustomEditor.toggleCodeBlock(editor)
                                break
                            }

                            case 'b': {
                                event.preventDefault()
                                CustomEditor.toggleBoldMark(editor)
                                break
                            }

                            case 'o': {
                                event.preventDefault()
                                console.log(value)
                                break
                            }

                            case 'i': {
                                event.preventDefault()
                                CustomEditor.toggleItalicMark(editor)
                                break
                            }

                            case 'u': {
                                event.preventDefault()
                                CustomEditor.toggleUnderlineMark(editor)
                                console.log(countWords(value))
                                break
                            }
                        }
                    }}
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