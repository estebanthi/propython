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
    mutation($email: String!, $premium: Boolean!) {
  updateProPythonUser(
    where: {
      email: $email
    },
    data: {
      isPremium: $premium,
      unlimitedPremium: $premium
    }
  ) {
    id
  }
}
  `;

    const result = await graphQLClient.request(query, {
        email: req.body.email,
        premium: req.body.premium
    })

    return res.status(200).send(result);
}