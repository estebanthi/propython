import ScrollUpButton from "react-scroll-up-button";
import React from "react";
import {ArrowCircleUp, WorkspacePremium} from "@mui/icons-material";
import styles from "./ScrollUp.module.scss"

const ScrollUp = () => {

    return (
        <ScrollUpButton
            ContainerClassName={styles.AnyClassForContainer}
            TransitionClassName={styles.AnyClassForTransition}
        >
            <ArrowCircleUp />
        </ScrollUpButton>
    )

}

export default ScrollUp