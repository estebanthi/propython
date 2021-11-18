import {post} from "../../../utils/callAPI";
import {generateTokenForUser} from "../../../utils/jwt.utils";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const userFound = await post("http://localhost:3000/api/users")

    if (userFound) {
        return res.status(404).json("User already existing")
    }

    const hashedPassword = await bcrypt.hash(password, 5)



}