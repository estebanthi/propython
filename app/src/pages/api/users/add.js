import clientPromise from "../../../../lib/mongodb";
import {checkAdminAccess} from "../../../utils/jwt.utils";

export default async function handler(req, res) {
    var headerAuth = req.headers['authorization'];
    var isAdmin = checkAdminAccess(headerAuth);

    if (isAdmin == 1) {

        const client = await clientPromise;
        const db = client.db();

        if (req.method == "POST") {
            await db.collection("Users").insertOne({username:req.body.username, password:req.body.password, email:req.body.email, isAdmin:req.body.isAdmin})
            res.status(200).json({username:req.body.username, password:req.body.password, email:req.body.email, isAdmin:req.body.isAdmin})
        }
    }
    else {
        res.status(500).json("Access denied")
    }
}