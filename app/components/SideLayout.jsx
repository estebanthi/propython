import PremiumWidget from "./PremiumWidget";
import {Categories, PostWidget} from "./index";
import Ressources from "./Ressources";
import Contact from "./Contact";
import React from "react";


const SideLayout = ({post}) => {

    return (
        <div>
            <PremiumWidget />
            {post ? <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)}/> : <PostWidget/>}
            <Categories />
            <Ressources />
            <Contact />
        </div>
    )

}


export default SideLayout