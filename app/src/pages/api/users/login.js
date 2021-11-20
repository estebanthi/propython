import {get} from "../../../utils/privateCallAPI";
import {generateTokenForUser} from "../../../utils/jwt.utils";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
    const email = req.body.email
    const password = req.body.password

    const userFound = await get("http://localhost:3000/api/users")
        .then((users) => users.find(user => user.email == email))

    if (!userFound) {
        return res.status(404).json("User not found")
    }

    const resBcrypt = await bcrypt.compare(password, userFound.password)

    if (!resBcrypt) {
        return res.status(403).json("Wrong password")
    }

    return res.status(201).json({
        'userId': userFound._id,
        'token': generateTokenForUser(userFound)
    })


}