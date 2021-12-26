import {IconButton, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ListItem, Collapse} from "@material-ui/core";
import {useState} from "react";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import CircleIcon from '@mui/icons-material/Circle';
import Link from "next/link"


const ListHeading = (props) => {

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    const getStyle = () => {

        switch (props.heading.type) {
            case 2:
                return "font-bold text-xl text-blue-900"

            case 3:
                return "text-lg text-blue-700"

            case 4:
                return "text-pink-500"

        }

    }



    return (
        <div>
                <ListItem>
                   <Link href={`#${props.heading.id}`}>
                       <div className={"pl-"+props.pl}>
                        <ListItemButton onClick={() => handleClick(props.heading.id)}>
                            <span className={getStyle()}>{props.heading.title}</span>

                        </ListItemButton>
                       </div>
                   </Link>
                </ListItem>
                {props.heading.items.length ? props.heading.items.map((child) =>  <ListHeading heading={child} pl={props.pl+4}/>) : ""}
        </div>
    )

}


export default ListHeading