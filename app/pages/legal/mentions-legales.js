import {Layout} from "../../components";
import React from "react";
import RessourcesPage from "../ressources";
import Head from "next/head";

export default function MentionsLegales() {

    return (
        <div className="container mx-auto px-10 py-10 mb-8 bg-white rounded-lg w-1/2">
            <Head>
                <title>Mentions légales</title>
                <link rel="icon" href="https://media.graphcms.com/OYRgW8aSKuiUBJTEehZA" />
            </Head>
            <h1 className="font-bold text-4xl my-6">Mentions légales</h1>
            <p className="py-2">
                ProPython est un site édité par Mr Esteban Thilliez, dont l'auto entreprise est immatriculée sous le numéro 883 603 912 et ayant son siège social situé 114 rue du Bas Pommereau, 59 249 AUBERS.
            </p>
            <p className="py-2">
                Directeur de la publication : Mr Esteban Thilliez - contact@propython.fr
            </p>
            <p className="py-2">
                Le site Internet https://www.propython.fr est la propriété exclusive de Mr Esteban Thilliez
            </p>

            <h1 className="font-bold text-3xl py-6">Hébergement</h1>

            <p className="py-2">
                Le site Internet est hébergé par la société Obambu, 10 rue de Penthievre 75008 PARIS, Capital de 15 000 euros, Siret : 803 988 75700016.
            </p>

            <h1 className="font-bold text-3xl py-6">Propriété intellectuelle</h1>

            <p className="py-2">De manière générale, les données, les programmes, les échantillons musicaux, les textes, les informations, les logos, les identités visuelles, les images animées ou non et leurs mises en forme, les vidéos, apparaissant sur le Site sont la propriété de Mr Esteban Thilliez et sont protégées à ce titre par les dispositions du Code de la propriété intellectuelle.</p>

               <p className="py-2">Tout internaute ayant accès à ce contenu s'engage à ne l'utiliser uniquement dans le cadre du site.</p>

            <h1 className="font-bold text-3xl py-6">Commentaires</h1>
            <p className="py-2">Le site offre aux internautes la possibilité de publier des commentaires. Cependant, tout commentaire jugé irrespectueux ou insultant envers une personne, une communauté, ou un contenu, où n'ayant aucun rapport avec le contenu du site sera supprimé.</p>

            <h1 className="font-bold text-3xl py-6">Responsabilité</h1>
            <p className="py-2">Mr Esteban Thilliez décline toute responsabilité quant aux éventuels dysfonctionnements pouvant survenir sur le Site et entraîner une perte de données ou une indisponibilité de l’accès aux informations produites sur celui-ci. Mr Esteban Thilliez ne garantit pas l'exactitude, l'exhausitivté et la véracité des informations présentes sur le site ainsi que l'absence de modification par un tiers éventuellement malveillant (hack, virus). L'internaute est donc responsable de l'utilisation qu'il fait du contenu du site.</p>
            <p className="py-2">Le contenu présent sur le site est susceptible d'être modifié à tout moment sans préavis, et est mis à disposition des internautes sans aucune sorte de garantie.</p>
            <p className="py-2">Mr Esteban Thilliez décline toute responsabilité quant aux sites vers lesquels peuvent être redirigés les internautes par utilisation des liens hypertextes présents sur le site.</p>
        </div>
    )


}

MentionsLegales.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )

}