import {gql, GraphQLClient} from "graphql-request";
import {compareSync, genSaltSync, hashSync} from "bcrypt";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });

    const query = gql`
    query MyQuery($email: String!) {
  proPythonUser(where: {email: $email}) {
    id
    password
    email
    username
    isPremium
    premiumSince
    unlimitedPremium
    premiumUntil
  }
}
  `;

    const userFound = await graphQLClient.request(query, {
        email: req.body.email,
    })
        .then((result) => result.proPythonUser)

    if (!userFound) {
        return res.status(200).json("user not found")
    }
    const password = userFound.password

    let check = false
    if (password == req.body.password) {
        check = true
    } else {
    check = await compareSync(req.body.password, password)
    }

    if (!check) {
        return res.status(200).json("wrong password")
    }

    return res.status(200).json({user: userFound})
}