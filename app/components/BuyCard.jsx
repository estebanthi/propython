import {Switch} from "@mui/material";
import {useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
import Spinner from "./Spinner";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

const BuyCard = () => {

    const [selected, setSelected] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const createCheckOutSession = async () => {
        setSpinner(true)
        const stripe = await stripePromise;

        const item = {
            name: "Abonnement ProPython Premium 1 mois",
            price: 15,
            description: "Devenir premium sur ProPython, c'est accéder à des articles exclusifs et des ressources inédites pour progresser, c'est aussi bénéficier d'un accompagnement personnalisé et de vidéos explicatives, mais c'est également soutenir le site et la création de contenus.",
            image:"https://media.graphcms.com/2Gsk27ST3qce91mtPOYR"}

        const checkoutSession = await axios.post('/api/payment/create-stripe-session', {
            item: item,
        });
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });
        if (result.error) {
            alert(result.error.message);
        }
        setSpinner(false)
    };


    return (
        <div className="bg-white p-8 rounded-lg">
            <div className="flex flex-col justify-center items-center">
                <span className="text-violet-900 text-7xl font-bold">15<span className="text-2xl">€ TTC</span></span>
                <p className="my-3 border-b-2 border-blue-900">Des articles <b>exclusifs</b></p>
                <p className="my-3 border-b-2 border-blue-900">Des ressources <b>premium</b></p>
                <p className="my-3 border-b-2 border-blue-900">De nouveaux <b>projets</b></p>
                <p className="my-3 border-b-2 border-blue-900">Des <b>vidéos</b> explicatives</p>
                <button onClick={createCheckOutSession} className="my-3 bg-violet-900 text-white font-bold p-4 rounded-lg">Passer premium (1 mois)</button>
                {spinner && <div className="mt-2"><Spinner color="#4C1D95"/></div>}
            </div>
        </div>
    )

}

export default BuyCard