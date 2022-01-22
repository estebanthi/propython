import {useEffect, useState} from "react";
import {getPreviousNextPosts} from "../services";
import {ArrowBackIos, ArrowForwardIos} from "@material-ui/icons";
import Link from "next/link"
import {useRouter} from "next/router";


const PreviousNextArticles = ({slug}) => {

    const [previous, setPrevious] = useState()
    const [next, setNext] = useState()

    const router = useRouter()

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
                {previous && <div className="bg-white p-4 rounded-lg w-52 flex items-center font-semibold cursor-pointer" onClick={() => window.location = "/post/"+previous.slug}>{<ArrowBackIos />}{next.title}</div>}
            </div>
            <div>
                {next && <div className="bg-white p-4 rounded-lg w-52 flex items-center font-semibold cursor-pointer" onClick={() => window.location = "/post/"+next.slug}>{next.title}{<ArrowForwardIos />}</div>}
            </div>
        </div>
    )
}

export default PreviousNextArticles