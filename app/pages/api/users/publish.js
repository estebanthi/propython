import {gql, GraphQLClient} from "graphql-request";
import {genSaltSync, hashSync} from "bcrypt";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });


    const query = gql`
    mutation PublishProPythonUser($email: String!){
  publishProduct(where: { email: $email}, to: PUBLISHED) {
    id
  }
}
  `;

    const result = await graphQLClient.request(query, {
        email: req.body.email
    });

    return res.status(200).json(result)
}