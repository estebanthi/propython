import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


// export a default function for API route to work
export default async function asynchandler(req, res) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });

    const query = gql`
    query MyQuery($username: String!) {
  proPythonUser(where: {username: $username}) {
    id
  }
}
  `;

    const result = await graphQLClient.request(query, {
        username: req.body.username,
    });

    return res.status(200).send(result);
}