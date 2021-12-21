import { GraphQLClient, gql } from 'graphql-request';
import axios from "axios";
import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {
    console.log(1)
    console.log(process.env.GRAPHCMS_TOKEN)
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });

    const query = gql`
    query MyQuery($id: ID) {
  asset(where: {id: $id}) {
    url
    fileName
  }
}

  `;

    const result = await graphQLClient.request(query, {
        id: req.query.id,
    });
    const url = result.asset.url
    const fileName = result.asset.fileName

    const response = await fetch(url); // replace this with your API call & options
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

    res.setHeader('Content-Type', parseType(fileName));
    res.setHeader('Content-Disposition', 'attachment; filename='+fileName);
    await pipeline(response.body, res);

}

const parseType = (fileName) => {

    if (fileName.includes(".py")) {
        return 'application/x-python-code'
    }

}