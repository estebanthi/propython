import Loader from "react-loader-spinner";
import React from "react";


const Spinner = (props) => {

    return <Loader
        type="Circles"
        color="#00BFFF"
        height={30}
        width={30}
        visible={props.visible}
    />

}

export default Spinner