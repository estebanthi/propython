import {post, get} from "../../../utils/callAPI";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const userFound = await get("http://localhost:3000/api/users")
        .then((users) => users.find(user => user.email == email))

    if (userFound) {
        return res.status(404).json("User already existing")
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    const response = await post("http://localhost:3000/api/users", {email:email, username:username, password:hashedPassword, isAdmin:0})

    return res.status(200).json(response)


}