import {Editor, Path, Text, Transforms} from "slate";
import {ReactEditor} from "slate-react";

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
        console.log(editor)
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleItalicMark(editor) {
        console.log(editor)
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

    createLink(editor, href) {
        Transforms.setNodes(
            editor,
            { type: 'link', href: href },
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

export default CustomEditor
