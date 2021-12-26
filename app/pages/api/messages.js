import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });

    const findUserQuery = gql`
  query MyQuery($email: String!) {
  proPythonUser(where: {email: $email}) {
    id
  }
}
  `

    const userFound = await graphQLClient.request(findUserQuery, {email: req.body.email})

    if (!userFound.proPythonUser) {
        const createUserQuery = gql `
    mutation CreateProPythonUser($name: String!, $email: String!) {
      createProPythonUser(data: {name: $name, email: $email}) { id }
    }
    `
        const userCreated = await graphQLClient.request(createUserQuery, {name: req.body.name, email: req.body.email})

        const publishUser = gql `
    mutation query($email: String!) {
  publishProPythonUser(where: {email: $email}) {
    id
  }
}

        `
        const contentPublished = await graphQLClient.request(publishUser, {email: req.body.email})
    }




    const query = gql`
    mutation CreateMessage($email: String!, $message: String!) {
      createMessage(data: {proPythonUser: {connect: {email: $email}}, message: $message}) { id }
    }
  `;

    const result = await graphQLClient.request(query, {
        email: req.body.email,
        message: req.body.message,
    });

    return res.status(200).send(result);
}