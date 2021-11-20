import {post, get} from "../../../utils/privateCallAPI";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const validationResult = validation(req, res)
    if (validationResult !== "OK") {
        return validationResult
    }

    const userFound = await get("http://localhost:3000/api/users")
        .then((users) => users.find(user => user.email == email))

    if (userFound) {
        return res.status(404).json("User already existing")
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    const response = await post("http://localhost:3000/api/users/add", {email:email, username:username, password:hashedPassword, isAdmin:0})

    return res.status(200).json(response)


}


const validation = function(req, res) {

    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    if (!req.body.email.match(emailRegex)) {
        return res.status(500).json("Email not valid")
    }


    return "OK"

}