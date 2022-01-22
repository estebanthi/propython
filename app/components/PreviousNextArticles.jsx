import {useEffect, useState} from "react";
import {getPreviousNextPosts} from "../services";
import {ArrowBackIos, ArrowForwardIos} from "@material-ui/icons";
import Link from "next/link"


const PreviousNextArticles = ({slug}) => {

    const [previous, setPrevious] = useState()
    const [next, setNext] = useState()

    useEffect(async () => {

        const data = await getPreviousNextPosts(slug)
        if (data.next) {
            setNext(data.next)
        }
        if (data.previous) {
            setPrevious(data.previous)
        }
    }, [])

    return (
        <div className="flex justify-between my-12">
            <div>
                {previous && <Link href={"/post/"+previous.slug}><div className="bg-white p-4 rounded-lg w-52 flex items-center font-semibold cursor-pointer">{previous.title}{<ArrowBackIos />}</div></Link>}
            </div>
            <div>
                {next && <Link href={"/post/"+next.slug}><div className="bg-white p-4 rounded-lg w-52 flex items-center font-semibold cursor-pointer">{next.title}{<ArrowForwardIos />}</div></Link>}
            </div>
        </div>
    )
}

export default PreviousNextArticles