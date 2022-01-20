import sgMail from '@sendgrid/mail'
import {checkAppAuthorization} from "../../../utils";


export default async function asynchandler(req, res) {

    if (!checkAppAuthorization(req)) { return res.status(403).json("Access denied") }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: req.body.email, // Change to your recipient
        from: process.env.NEXT_PUBLIC_ADMIN_EMAIL, // Change to your verified sender
        templateId: "d-b1755b3a7e3549749db2393f42f94cbe",
        dynamic_template_data: {code: req.body.code}
    }
    return await sgMail
        .send(msg)
        .then(() => console.log("mail sent"))
        .then(() => res.status(200).json("Mail sent"))
        .catch((error) => {
            res.status(500).json("Error while sending mail")
        })

}