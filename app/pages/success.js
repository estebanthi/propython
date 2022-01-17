import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {goPremiumLimited} from "../services";
import {getSession, signIn} from "next-auth/react";
import Image from "next/image";
import NoHeaderLayout from "../components/NoHeaderLayout";
import SignInPage from "./auth/sign-in";

const myLoader = ({ src }) => {
    return "https://media.graphcms.com/2Gsk27ST3qce91mtPOYR"
}


const Success = () => {


    const [success, setSuccess] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()
    const {session_id} = router.query

    useEffect(async () => {
        if(!session_id) {
            return;
        }
        const data = await axios.get(`/api/payment/checkout-sessions/${session_id}`)
            .then((res) => res.status)
            .then((status) => {
                if (status == 200) {
                    return true
                }
                return false
            })
        if(data) {{
            const session = await getSession()
            setSuccess(true)
            setLoaded(true)
            await goPremiumLimited(session.user.email)
            await signIn("credentials", {email: "blabla", password: session.user.password, callbackUrl: "/"})
        }
        }
    }, [session_id]);

    return (
        <div>{!loaded ? <div className="flex justify-center flex-col items-center bg-white rounded-lg p-8 mt-20 lg:mx-[300px] mx-20"><h1 className="text-3xl font-bold my-6">Chargement...</h1>


        </div> : (success ? <div className="flex justify-center flex-col items-center bg-white rounded-lg p-8 mt-20 lg:mx-[300px] mx-20"><h1 className="text-3xl font-bold my-6">Merci pour votre achat !</h1>
            <span className="text-xl text-green-500 font-semibold my-3">La transaction a été réalisée avec succès, vous allez être redirigé vers la page d'accueil.</span>
            <Image src="https://media.graphcms.com/2Gsk27ST3qce91mtPOYR"
            loader={myLoader}
            height={143}
            width={402}/>
        </div> : <div className="flex justify-center flex-col items-center bg-white rounded-lg p-8 mt-20 lg:mx-[300px] mx-20"><h1 className="text-3xl font-bold my-6">Session invalide</h1>
            <span className="text-xl text-red-500 font-semibold my-3">La transaction n'existe pas ou n'a pas pu se réaliser. Si vous pensez qu'il s'agit d'une erreur, contactez le site.</span>
        </div>)}</div>
    );
}

export default Success;

Success.getLayout = function getLayout(page) {

    return (
        <NoHeaderLayout>
            {page}
        </NoHeaderLayout>
    )

}
