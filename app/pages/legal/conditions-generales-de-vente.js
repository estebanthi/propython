import {Layout} from "../../components";
import React from "react";
import Head from "next/head";

export default function ConditionsGeneralesDeVente() {

    return (
        <div className="container mx-auto px-10 py-10 mb-8 bg-white rounded-lg w-1/2">
            <Head>
                <title>Conditions générales de vente - ProPython</title>
            </Head>
            <h1 className="font-bold text-4xl my-6">Conditions générales de vente des produits vendus sur ProPython</h1>

            <h2 className="text-3xl font-bold py-6">Article 1 - Objet</h2>

            <p className="py-2">Les présentes conditions régissent les ventes par la société Esteban Thilliez 114 rue du Bas Pommereau 59249 Aubers, pour les abonnements au site.</p>

            <h2 className="text-3xl font-bold py-6">Article 2 - Prix</h2>

            <p className="py-2">Les prix de nos produits sont indiqués en euros toutes taxes comprises sauf indication contraire.</p>

            <p className="py-2">Toutes les commandes quelle que soit leur origine sont payables en euros.</p>

            <p className="py-2">La société <b>Esteban Thilliez</b> se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande et sous réserve de disponibilité.</p>

            <h2 className="text-3xl font-bold py-6">Article 3 - Commandes</h2>

            <b>Vous pouvez passer commande : </b>

            <p className="py-2">Sur Internet : <a href="https://www.propython.fr">https://www.propython.fr</a></p>

            <p className="py-2">Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.</p>

            <p className="py-2">La société <b>Esteban Thilliez</b> se réserve le droit de ne pas enregistrer un paiement, et de ne pas confirmer une commande pour quelque raison que ce soit, et plus particulièrement en cas de problème d'approvisionnement, ou en cas de difficulté concernant la commande reçue.</p>

            <h2 className="text-3xl font-bold py-6">Article 4 - Validation de votre commande</h2>

            <p className="py-2">Toute commande figurant sur le site Internet <a href="https://www.propython.fr">https://www.propython.fr</a> suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.</p>

            <p className="py-2">L'ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction.</p>

            <p className="py-2">Vous déclarez en avoir parfaite connaissance.</p>

            <p className="py-2">La confirmation de commande vaudra signature et acceptation des opérations effectuées.</p>

            <h2 className="text-3xl font-bold py-6">Article 5 - Paiement</h2>

            <p className="py-2">Le fait de valider votre commande implique pour vous l'obligation de payer le prix indiqué.</p>

            <p className="py-2">Le règlement de vos achats s'effectue par carte bancaire grâce au système sécurisé Stripe.</p>

            <p className="py-2">Le débit de la carte est effectué directement après le passage de la commande.</p>

            <h2 className="text-3xl font-bold py-6">Article 6 - Rétractation</h2>

            <p className="py-2">Conformément aux dispositions de l'article L.121-21 du Code de la Consommation, vous disposez d'un délai de rétractation de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétraction sans avoir à justifier de motifs ni à payer de pénalité.</p>

            <p className="py-2">En cas d'exercice du droit de rétractation, la société <b>Esteban Thilliez</b> procédera au remboursement des sommes versées, dans un délai de 14 jours suivant la notification de votre demande et via le même moyen de paiement que celui utilisé lors de la commande.</p>

            <p className="py-2"><b>EXCEPTIONS AU DROIT DE RETRACTATION</b></p>

            <ul className="list-disc py-2 ml-4">Conformément aux dispositions de l'article L.121-21-8 du Code de la Consommation, le droit de rétractation ne s'applique pas à :

                <li>La fourniture de services pleinement exécutés avant la fin du délai de rétractation et dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.</li>
                <li>La fourniture de biens ou de services dont le prix dépend de fluctuations sur le marché financier échappant au contrôle du professionnel et susceptibles de se produire pendant le délai de rétractation.</li>
                <li>La fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés.</li>
                <li>La fourniture de biens susceptibles de se détériorer ou de se périmer rapidement.</li>
                <li>La fourniture de biens qui ont été descellés par le consommateur après la livraison et qui ne peuvent être renvoyés pour des raisons d'hygiène ou de protection de la santé.</li>
                <li>La fourniture de biens qui, après avoir été livrés et de par leur nature, sont mélangés de manière indissociable avec d'autres articles ;</li>
                <li>La fourniture de boissons alcoolisées dont la livraison est différée au-delà de trente jours et dont la valeur convenue à la conclusion du contrat dépend de fluctuations sur le marché échappant au contrôle du professionnel.</li>
                <li>La fourniture d'enregistrements audio ou vidéo ou de logiciels informatiques lorsqu'ils ont été descellés par le consommateur après la livraison.</li>
                <li>La fourniture d'un journal, d'un périodique ou d'un magazine, sauf pour les contrats d'abonnement à ces publications.</li>
                <li>Les transactions conclues lors d'une enchère publique.</li>
                <li>La fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.</li>
            </ul>
            <h2 className="text-3xl font-bold py-6">Article 7- Disponibilité</h2>

            <p className="py-2">Nos produits sont proposés tant qu'ils sont visibles sur le site <a href="https://www.propython.fr">https://www.propython.fr</a>.</p>
            <p className="py-2">En cas d'indisponibilité de produit après passation de votre commande, nous vous en informerons par mail. Votre commande sera automatiquement annulée et aucun débit bancaire ne sera effectué.</p>


            <h2 className="text-3xl font-bold py-6">Article 8 - Livraison</h2>

            <p className="py-2">Le produit est livré sous forme d’abonnement actif instantanément après passage de la commande.</p>

            <h2 className="text-3xl font-bold py-6">Article 9 - Garantie</h2>

            <p className="py-2">Nos produits sont remboursables dans le cas où une erreur de notre part entraîne une annulation de votre abonnement. Dès lors que votre abonnement est actif, il est donc de votre ressort de faire attention à ne pas perdre vos identifiants pour ne pas perdre votre abonnement.</p>

            <p className="py-2">Toutes les réclamations, demandes d'échange ou de remboursement doivent s'effectuer par Mail dans le délai de 30 jours de la livraison.</p>

            <p className="py-2">Les dispositions de cet Article ne vous empêchent pas de bénéficier du droit de rétractation prévu à l'article 6.</p>

            <h2 className="text-3xl font-bold py-6">Article 10 - Responsabilité</h2>

            <p className="py-2">Les produits proposés sont conformes à la législation française en vigueur. La responsabilité de la société <b>Esteban Thilliez</b> ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré. Il vous appartient de vérifier auprès des autorités locales les possibilités d'importation ou d'utilisation des produits ou services que vous envisagez de commander.</p>

            <p className="py-2">Par ailleurs, la société <b>Esteban Thilliez</b> ne saurait être tenue pour responsable des dommages résultant d'une mauvaise utilisation du produit acheté.</p>

            <p className="py-2">Enfin la responsabilité de la société <b>Esteban Thilliez</b> ne saurait être engagée pour tous les inconvénients ou dommages inhérents à l'utilisation du réseau Internet, notamment une rupture de service, une intrusion extérieure ou la présence de virus informatiques.</p>

            <h2 className="text-3xl font-bold py-6">Article 11 - Droit applicable en cas de litiges</h2>

            <p className="py-2">La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents.</p>

            <h2 className="text-3xl font-bold py-6">Article 12 - Propriété intellectuelle</h2>

            <p className="py-2">Tous les éléments du site <a href="https://www.propython.fr">https://www.propython.fr</a> sont et restent la propriété intellectuelle et exclusive de la société <b>Esteban Thilliez</b>. Nul n'est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu'ils soient logiciels, visuels ou sonores. Tout lien simple ou par hypertexte est strictement interdit sans un accord écrit exprès de la société <b>Esteban Thilliez</b>.</p>

            <h2 className="text-3xl font-bold py-6">Article 13 - Données personnelles</h2>

            <p className="py-2">La société <b>Esteban Thilliez</b> se réserve le droit de collecter les informations nominatives et les données personnelles vous concernant. Elles sont nécessaires à la gestion de votre commande, ainsi qu'à l'amélioration des services et des informations que nous vous adressons.</p>

            <p className="py-2">Elles peuvent aussi être transmises aux sociétés qui contribuent à ces relations, telles que celles chargées de l'exécution des services et commandes pour leur gestion, exécution, traitement et paiement.</p>

            <p className="py-2">Ces informations et données sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires.</p>

            <p className="py-2">Conformément à la loi du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification et d'opposition aux informations nominatives et aux données personnelles vous concernant, directement sur le site Internet.</p>

            <h2 className="text-3xl font-bold py-6">Article 14 - Archivage Preuve</h2>

            <p className="py-2">La société <b>Esteban Thilliez</b> archivera les bons de commandes et les factures sur un support fiable et durable constituant une copie fidèle conformément aux dispositions de l'article 1348 du Code civil.</p>

            <p className="py-2">Les registres informatisés de la société <b>Esteban Thilliez</b> seront considérés par toutes les parties concernées comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.</p>

        </div>
    )


}

ConditionsGeneralesDeVente.getLayout = function getLayout(page) {

    return (
        <Layout>
            {page}
        </Layout>
    )

}