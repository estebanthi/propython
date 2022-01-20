import { GraphQLClient, gql } from 'graphql-request';
import {checkAppAuthorization} from "../../../utils";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
    if (!checkAppAuthorization(req)) { return res.status(403).json("Access denied") }
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });

    const query = gql`
    mutation CreateProPythonUser($email: String!) {
      createProPythonUser(data: {email: $email}) { id }
    }
  `;

    const result = await graphQLClient.request(query, {
        email: req.body.email,
    });

    return res.status(200).send(result);
}