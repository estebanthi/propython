import {gql, GraphQLClient} from "graphql-request";
import {compareSync, genSaltSync, hashSync} from "bcrypt";
import {checkAppAuthorization} from "../../../utils";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function asynchandler(req, res) {
    if (!checkAppAuthorization(req)) { return res.status(403).json("Access denied") }
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
    });

    const check = gql`
    query MyQuery($email: String!) {
  proPythonUser(where: {email: $email}) {
    premiumSince,
    premiumUntil,
    isPremium
  }
}
  `;

    const user = await graphQLClient.request(check, {
        email: req.body.email,
    })
        .then((data) => data.proPythonUser)

    if (!user.isPremium) {
        const now = new Date(Date.now())
        let copy = new Date(Date.now())
        let until = new Date(copy.setMonth(copy.getMonth()+1))
        const query = gql`
    mutation($email: String!, $premiumSince: Date!, $premiumUntil: DateTime!) {
  updateProPythonUser(
    where: {
      email: $email
    },
    data: {
      isPremium: true,
      unlimitedPremium: false,
      premiumSince: $premiumSince,
      premiumUntil: $premiumUntil
    }
  ) {
    id
  }
}
  `;

        const result = await graphQLClient.request(query, {
            email: req.body.email,
            premiumSince: now,
            premiumUntil: until
        })
        return res.status(200).send(result);
    } else {
        let date = new Date(user.premiumUntil)
        let until = new Date(date.setMonth(date.getMonth()+1))
        const query = gql`
    mutation($email: String!, $premiumUntil: DateTime!) {
  updateProPythonUser(
    where: {
      email: $email
    },
    data: {
      premiumUntil: $premiumUntil
    }
  ) {
    id
  }
}
  `;

        const result = await graphQLClient.request(query, {
            email: req.body.email,
            premiumUntil: until
        })
        return res.status(200).send(result);
    }


}