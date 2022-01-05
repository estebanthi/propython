import sgMail from '@sendgrid/mail'


export default async function asynchandler(req, res) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL, // Change to your recipient
        from: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // Change to your verified sender
        subject: 'Nouveau message',
        text: "Utilisateur : " + req.body.username + "\nEmail : " + req.body.email +"\nMessage : " + req.body.message
    }
     await sgMail.send(msg)
         .then(() => res.status(200).json("mail sent"))

}