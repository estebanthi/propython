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
    const hashedPassword = hashSync(req.body.newPassword, salt)

    const query = gql`
    mutation($email: String!, $password: String!) {
  updateProPythonUser(
    where: {
      email: $email
    },
    data: {
      password: $password
    }
  ) {
    id
  }
}
  `;
        const createQueryResult = await graphQLClient.request(query, {
            email: req.body.email,
            password: hashedPassword,
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