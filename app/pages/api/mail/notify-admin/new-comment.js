import sgMail from '@sendgrid/mail'


export default async function asynchandler(req, res) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL, // Change to your recipient
        from: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // Change to your verified sender
        subject: 'Nouveau commentaire',
        text: 'Article : ' + req.body.slug + "\nUtilisateur : " + req.body.username + "\nCommentaire : " + req.body.comment
    }
    return await sgMail
        .send(msg)
        .then(() => res.status(200).json("Mail sent"))
        .catch((error) => {
            res.status(500).json("Error while sending mail")
        })

}