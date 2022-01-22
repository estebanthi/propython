import Link from "next/link";
import moment from "moment";
import {WorkspacePremium} from "@mui/icons-material";
import React from "react";
import {useSession} from "next-auth/react";


const GroupCard = ({group}) => {

    const { data: session, status } = useSession()

    let prerequis
    if (group.prerequis) {
        prerequis = group.prerequis.split("\n")
    }

    const getColors = () => {
        switch (group.difficulty) {
            case "Facile":
                return "border-green-700 text-green-700"
            case "Moyen":
                return "border-orange-500 text-orange-500"
            case "Difficile":
                return "border-red-600 text-red-600"
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md pb-80 mb-6">
                <img src={group.image.url}
                     alt={group.title}
                     className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"/>
            </div>
            <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold px-2">
                <Link href={"/group/"+group.slug}>
                    {group.title}
                </Link>
            </h1>
            <div className="bloc flex text-center items-center justify-center mb-8 w-full">
                <div className="font-medium text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                        {moment(group.createdAt).format("DD MMM, YYYY")}
                    </span>
                </div>
                {group.difficulty ? <span className={"ml-10 border-2 px-2 rounded-3xl "+getColors()}>{group.difficulty}</span> : ""}
                {group.premium ? <div className="text-violet-900 ml-10" data-tip="Article Premium">
                    <WorkspacePremium />
                </div> : ""}
            </div>
            {prerequis ? <div className="bloc flex text-center items-center justify-center mb-8 w-full flex-col">
                <span className="font-bold">Prérequis</span>
                <div className="mt-4 flex-col flex lg:flex-row">
                    {prerequis.map((item) => {
                        return <span className="mx-2 p-2 rounded-3xl border-2 border-sky-600 text-sky-600 my-2 lg:my-0">{item}</span>
                    })}
                </div>
            </div> : ""}

            <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">{group.description}</p>
            <div className="flex justify-center items-center flex-col mb-8">
                <h3 className="font-semibold my-4">Contient les articles suivants : </h3>
                {group.posts.map((post) => <Link href={"/post/"+post.slug}><span className="my-1 text-blue-900 cursor-pointer">{post.title}</span></Link>)}
            </div>
            <div className="text-center">
                {group.premium ? (status == "unauthenticated" ?
                    <Link href={{
                        pathname: "/auth/sign-in",
                        query: {callbackUrl: "/group/"+group.slug}
                    }}>
                    <span
                        className="transition duration-500 transform hover:-translate-y-1 inline-block bg-violet-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
                    >
                    Se connecter
                </span></Link> : ((session ? session.user.isPremium : false) ? <Link href={"/group/"+group.slug}>

                      <span onClick={() => {
                          analytics.track({
                              anonymousId: '48d213bb-95c3-4f8d-af97-86b2b404dcfe',
                              event: 'Group viewed',
                              properties: {
                                  group: group.slug
                              }
                          })
                      }} className="transition duration-500 transform hover:-translate-y-1 inline-block bg-violet-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                          Voir la suite
                      </span>
                    </Link> : <Link href="/premium">

                      <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-violet-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                          Devenir Premium
                      </span>
                    </Link>)) : <Link href={"/group/"+group.slug}>

                      <span onClick={() => {
                          analytics.track({
                              anonymousId: '48d213bb-95c3-4f8d-af97-86b2b404dcfe',
                              event: 'Group viewed',
                              properties: {
                                  post: group.slug
                              }
                          })
                      }} className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
                          Voir la suite
                      </span>
                </Link>}
            </div>
        </div>
    )

}

export default GroupCard