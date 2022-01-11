import {gql, GraphQLClient} from "graphql-request";
import {genSaltSync, hashSync} from "bcrypt";
import axios from "axios";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });

    const salt = genSaltSync(10)
    const hashedPassword = hashSync(req.body.password, salt)

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