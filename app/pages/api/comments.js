import { GraphQLClient, gql } from 'graphql-request';
import axios from "axios";

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


  const query = gql`
    mutation CreateComment($userId: ID!, $comment: String!, $slug: String!) {
      createComment(data: {proPythonUser: {connect: {id: $userId}}, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  const result = await graphQLClient.request(query, {
    userId: req.body.userId,
    comment: req.body.comment,
    slug: req.body.slug,
  });


  const publish = gql`
    mutation PublishComment($id: ID!){
  publishComment(where: { id : $id}, to: PUBLISHED) {
    id
  }
}
`

  const publishResult = await graphQLClient.request(publish, {
    id: result.createComment.id
  });

  const notifyAdmin = await axios.post(process.env.NEXT_PUBLIC_BASE_URL+"/api/mail/notify-admin/new-comment", {slug: req.body.slug, userId: req.body.userId, comment: req.body.comment, username:req.body.username})

  return res.status(200).send(publishResult);
}