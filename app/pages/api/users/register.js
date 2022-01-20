import {gql, GraphQLClient} from "graphql-request";
import {genSaltSync, hashSync} from "bcrypt";
import axios from "axios";
import {checkAppAuthorization} from "../../../utils";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {
    if (!checkAppAuthorization(req)) { return res.status(403).json("Access denied") }
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });

    const salt = genSaltSync(10)
    const hashedPassword = hashSync(req.body.password, salt)


    if (req.body.unlimitedPremium) {
        const query = gql`
    mutation CreateProPythonUser($username: String!, $email: String!, $password: String!, $isPremium: Boolean!, $premiumSince: Date!, $unlimitedPremium: Boolean!) {
      createProPythonUser(data: {username: $username, email: $email, password: $password, isPremium: $isPremium, premiumSince: $premiumSince, unlimitedPremium: $unlimitedPremium}) { id }
    }
  `;
        const now = new Date(Date.now())
        const createQueryResult = await graphQLClient.request(query, {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isPremium: req.body.premium,
            unlimitedPremium: req.body.unlimitedPremium,
            premiumSince: now,
        });
    } else {
        const query = gql`
    mutation CreateProPythonUser($username: String!, $email: String!, $password: String!, $isPremium: Boolean!, $unlimitedPremium: Boolean!) {
      createProPythonUser(data: {username: $username, email: $email, password: $password, isPremium: $isPremium, unlimitedPremium: $unlimitedPremium}) { id }
    }
  `;
        const createQueryResult = await graphQLClient.request(query, {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isPremium: false,
            unlimitedPremium: false,
        });
    }


    const publishQuery = gql`
    mutation PublishProPythonUser($email: String!){
  publishProPythonUser(where: { email: $email}, to: PUBLISHED) {
    id
  }
}
  `

    const result = await graphQLClient.request(publishQuery, {
        email: req.body.email
    });



    return res.status(200).json(result)
}