import clientPromise from "../../../../lib/mongodb";
import {checkAdminAccess} from "../../../utils/jwt.utils";

export default async function handler(req, res) {
    var headerAuth = req.headers['authorization'];
    var isAdmin = checkAdminAccess(headerAuth);
    if (isAdmin == 1) {
        const client = await clientPromise;
        const db = client.db();

        if (req.method == "GET") {
            var users = await db.collection("Users").find().toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r));
            res.status(200).json(users)
        }

        if (req.method == "POST") {
        }
    }
    else {
        res.status(500).json("access denied")
    }
}