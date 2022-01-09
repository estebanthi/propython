import {Layout} from "../../components";
import React from "react";
import EditorComponent from "../../components/EditorComponent";


const EditorPage = () => {


    return (
        <div>
            <div className="px-10">
                <EditorComponent />
            </div>
        </div>
    )

}

export default EditorPage


EditorPage.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )

}