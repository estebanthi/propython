import { request, gql } from "graphql-request";
import axios from "axios";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
  postsConnection {
    edges {
      node {
        author {
          bio
          name
          id
            photo {
                url
            }
        }
        createdAt
        slug
        title
        excerpt
        difficulty
        prerequis
        premium
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
      }
    }
  }
}   
    `

    const result = await request(graphqlAPI, query);
    const sortedResult = await result.postsConnection.edges.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
            return 1
        }
        return -1
    })
    return sortedResult;
};

export const getPostsDetails = async (slug) => {
    const query = gql`
    query GetPostDetails($slug: String!) {
  post(where: {slug:$slug}) {
  
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        difficulty
        prerequis
        premium
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
        raw
        }
      }
    }
  

    `

    const result = await request(graphqlAPI, query, {slug});

    return result.post;
};

export const getRecentPosts = async () => {
    const query = gql`
    query GetPostDetails() {
        posts(orderBy: createdAt_ASC
        last: 3
        ) {
        title
        premium
        featuredImage {
        url
        }
        createdAt
        slug
        }
    }
    `
    const result = await request(graphqlAPI, query);

    return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
        posts(
        where: {slug_not:$slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
        ) {
        title
        featuredImage {
        url
        }
        premium
        createdAt
        slug
        }
        }
    `

    const result = await request(graphqlAPI, query, {categories, slug});

    return result.posts;
}

export const getFeaturedPosts = async () => {
    const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        premium
        title
        slug
        createdAt
      }
    }   
  `;

    const result = await request(graphqlAPI, query);

    return result.posts;
};

export const getCategories = async () => {
    const query = gql`
    query GetCategories {
    categories {
    name
    slug
    }
    }
    `
    const result = await request(graphqlAPI, query);
    return result.categories;
}

export const submitComment = async (obj) => {
    const result = await fetch("/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })

    return result.json();
}

export const submitUser = async (obj) => {
    const result = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })

    return result.json();
}


export const getComments = async (slug) => {
    const query = gql`
    query GetComments($slug: String!) {
    comments(where: {post: {slug: $slug}}) {
    proPythonUser {
        username
    }
    createdAt
    comment}
    }
    `
    const result = await request(graphqlAPI, query, {slug});
    return result.comments;
}

export const getCategoryPost = async (slug) => {
    const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            difficulty
            prerequis
            premium
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

    const result = await request(graphqlAPI, query, {slug});
    const sortedResult = await result.postsConnection.edges.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
            return 1
        }
        return -1
    })
    return sortedResult;
};


export const getRessources = async () => {
    const query = gql`
    query MyQuery {
  ressources {
    associatedAsset {
      fileName
      url
      id
    }
    description
    title
    premium
    associatedpost {
      createdAt
      featuredImage {
        url
      }
      title
      slug
    }
  }
}


    `

    const result = await request(graphqlAPI, query);
    const sortedResult = await result.ressources.sort((a, b) => {
        if (a.associatedpost.createdAt < b.associatedpost.createdAt) {
            return 1
        }
        return -1
    })
    return sortedResult;
};


export const submitDownload = async (id) => {
    const result = await axios.get("/api/download", {params: {id: id}})
    return result
}


export const submitMessage = async (obj) => {
    const result = await fetch("/api/mail/notify-admin/new-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })

    console.log(result)


    return result;
}


export const countPremiums = async() => {
    const result = await axios.post("/api/users/check/count-premiums")
    return result.data.proPythonUsers.length
}


export const goPremium = async(email) => {
    const result = await axios.post("/api/users/go-premium", {email: email, premium: true})
    const publishResult = await axios.post("/api/users/publish", {email: email})
    return publishResult.data
}


export const goPremiumLimited = async (email) => {
    const result = await axios.post("/api/users/go-premium-limited", {email: email, premium: true})
    const publishResult = await axios.post("/api/users/publish", {email: email})
    return publishResult.data
}