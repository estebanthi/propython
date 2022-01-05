import sgMail from '@sendgrid/mail'


export default async function asynchandler(req, res) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: "estebanthi62@gmail.com", // Change to your recipient
        from: 'admin@propython.fr', // Change to your verified sender
        subject: 'Nouveau commentaire',
        text: 'Article : ' + req.body.slug + "\nUtilisateur : " + req.body.userId + "\nCommentaire : " + req.body.comment
    }
    return await sgMail
        .send(msg)
        .then(() => console.log("mail sent"))
        .then(() => res.status(200).json("Mail sent"))
        .catch((error) => {
            res.status(500).json("Error while sending mail")
        })

}