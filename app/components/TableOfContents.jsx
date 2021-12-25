import {useState, useEffect} from "react";
import {List, ListItem} from "@material-ui/core";
import {Collapse, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import ListHeading from "./ListHeading";


const TableOfContents = () => {

    const [_document, set_document] = useState(null)
    const [nestedHeadings, setNestedHeadings] = useState([]);
    const [states, setStates] = useState([])
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    };

    useEffect(() => {
        set_document(document)
        const headingElements = Array.from(
            document.querySelectorAll("h2, h3, h4, h5, h6")
        );
        const newNestedHeadings = getNestedHeadings(headingElements);
        setNestedHeadings(newNestedHeadings);
        const max = newNestedHeadings[newNestedHeadings.length-1].id
        setStates(Array.apply(null, Array(max+1)).map(() => { return false }))
    }, [])

    const getNestedHeadings = (headingElements) => {
        const nestedHeadings = [];

        headingElements.forEach((heading, index) => {
            const { innerText: title, id} = heading;
            if (heading.nodeName === "H2") {
                nestedHeadings.push({ id, title, type:2, items: [] });
            } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
                nestedHeadings[nestedHeadings.length - 1].items.push({
                    id,
                    title,
                    type: 3,
                    items: []
                });
            }
            else if (heading.nodeName === "H4") {
                nestedHeadings[nestedHeadings.length-1].items[nestedHeadings[nestedHeadings.length-1].items.length-1].items.push({
                    id,
                    title,
                    type: 4,
                    items: []
                })
            }
            else if (heading.nodeName === "H5") {
                nestedHeadings[nestedHeadings.length-1].items[nestedHeadings[nestedHeadings.length-1].items.length-1].items[nestedHeadings[nestedHeadings.length-1].items[nestedHeadings[nestedHeadings.length-1].items.length-1].items.length-1].items.push({
                    id,
                    title,
                    type: 5,
                    items: []
                })
            }
        });
        return nestedHeadings;
    };

    return (
        <div className="hidden lg:flex mb-8 -ml-8 border-2 ml-8 mr-8 rounded-lg border-pink-500">
            <List>
                <ListItem>
                    <ListItemButton onClick={handleClick}>
                        <span className="text-xl font-bold mr-5 text-pink-700">Table des Matières</span>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <div className="flex flex-col ml-8">
                {nestedHeadings.map((heading) => {
                    return (
                        <div>
                            <ListHeading heading={heading} pl={0}/>
                        </div>

                    )
                })}
                </div>
                </Collapse>

            </List>
        </div>
    )

}


export default TableOfContents