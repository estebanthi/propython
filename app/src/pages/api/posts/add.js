import clientPromise from "../../../../lib/mongodb";
import {checkAdminAccess} from "../../../utils/jwt.utils";

export default async function handler(req, res) {
    var headerAuth = req.headers['authorization'];
    var isAdmin = checkAdminAccess(headerAuth);

    if (isAdmin == 1) {

        const client = await clientPromise;
        const db = client.db();

        if (req.method == "POST") {
            await db.collection("Users").insertOne({content:req.body.content})
            res.status(200).json({content:req.body.content})
        }
    }
    else {
        res.status(500).json("Access denied")
    }
}