import { GraphQLClient, gql } from 'graphql-request';
import axios from "axios";
import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {

    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzgwMTM2MjcsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2Nrd2R6dXlkZjBvODUwMXoyaGExaGM1bnUvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOGFkYWRlYzEtNTI5OC00N2NjLTlmNWQtZGIzMzkzZDM0MDM3IiwianRpIjoiY2t3aHIwcmtlMTV2YzAxemU3M3hvZ2w3NyJ9.eydV2Ek8fbTuLMU_Ir-YNHLXO6yOSrkA4TnLanzbrdzloFmCOK7yg7fsk1Nsz2WW4tuXx6LXy-CbEnCduQnuQ-YsNOsLBtSZD17NWa8Eyq8isLFfaD05k2AP9tIqN_O9K7tJ9gp9Tbp99Ms0eQnm6uLPvbQWxvWQ6TBKo97sOkR67NiyNm4yzPYMUnlhD7fMKnU2NmQtY6sXwIcYuEKoK_xEPF8TZdibPd_ZJA8D_4AbDVfmJMAnK6_x_kKnF4LmsvALw9ZXRvnZq7IYrJCTzfKc56p4aXQWhhlFn1aAXm8AoJiKlEIWWrShEjcj_xprD2DTVQTP7XFO1sJajojS_WViAlPed3eU06u1Nz3gj723DDb5xu37F2eECCKgzJrd8lZs6eG2ui01sWzOjXr7K2X3g67h6IRUJumrMUQeSaSzB--2nCUojzZPYMd8Qkdbcg5T16aOLRHJnywlmSSc9WQCYJjMw-taHhtu2pTHVv5PSQpfIRUAQ32ph0jmxj3QesiNEjGZ5xzABtgW-5S2jqv5q1WZwCZA4Uywup0CN49ozUT6xctJsM8rNpLF3CRC-pC7qcgpAZoEVxoe60cTqNiqTfJzZPl8oRHcc2ovl5c68nCRz5glkpSHwSjLzKKLN5aqboZqwl92Hu8OxrsltBW3V4H-a2-GA3Qh_kmNbz0",
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