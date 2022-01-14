import {Switch} from "@mui/material";
import {useState} from "react";

const BuyCard = () => {

    const [selected, setSelected] = useState(false)

    return (
        <div className="bg-white p-8 rounded-lg">
            <div className="flex flex-col justify-center items-center">
                <span className="text-violet-900 text-7xl font-bold">15<span className="text-2xl">€ TTC</span></span>
                <p className="my-3 border-b-2 border-blue-900">Des articles <b>exclusifs</b></p>
                <p className="my-3 border-b-2 border-blue-900">Des ressources <b>premium</b></p>
                <p className="my-3 border-b-2 border-blue-900">De nouveaux <b>projets</b></p>
                <p className="my-3 border-b-2 border-blue-900">Des <b>vidéos</b> explicatives</p>
                <button className="my-3 bg-violet-900 text-white font-bold p-4 rounded-lg">Passer premium (1 mois)</button>
            </div>
        </div>
    )

}

export default BuyCard