import sgMail from '@sendgrid/mail'


export default async function asynchandler(req, res) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: req.body.email, // Change to your recipient
        from: 'admin@propython.fr', // Change to your verified sender
        subject: 'Bienvenue chez ProPython !',
        text: 'Voici votre code : '+req.body.code,
    }
    return await sgMail
        .send(msg)
        .then(() => console.log("mail sent"))
        .then(() => res.status(200).json("Mail sent"))
        .catch((error) => {
            res.status(500).json("Error while sending mail")
        })

}