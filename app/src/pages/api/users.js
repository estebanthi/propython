import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db();
    var users = await db.collection("Users").find().toArray().then(r => JSON.stringify(r)).then(r => JSON.parse(r));
    res.status(200).json(users)
}