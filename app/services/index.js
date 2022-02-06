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
            "authorization": process.env.NEXT_PUBLIC_APP_AUTHORIZATION
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
            "authorization": process.env.NEXT_PUBLIC_APP_AUTHORIZATION
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
    const result = await axios.get("/api/download", {params: {id: id}}, {headers: {authorization: process.env.NEXT_PUBLIC_APP_AUTHORIZATION}})
    return result
}


export const submitMessage = async (obj) => {
    const result = await fetch("/api/mail/notify-admin/new-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": process.env.NEXT_PUBLIC_APP_AUTHORIZATION
        },
        body: JSON.stringify(obj),
    })

    console.log(result)


    return result;
}


export const countPremiums = async() => {
    const result = await axios.post("/api/users/check/count-premiums", {}, {headers: {authorization: process.env.NEXT_PUBLIC_APP_AUTHORIZATION}})
    return result.data.proPythonUsers.length
}




export const goPremiumLimited = async (email) => {
    const result = await axios.post("/api/users/go-premium-limited", {email: email, premium: true}, {headers: {authorization: process.env.NEXT_PUBLIC_APP_AUTHORIZATION}})
    const publishResult = await axios.post("/api/users/publish", {email: email}, {headers: {authorization: process.env.NEXT_PUBLIC_APP_AUTHORIZATION}})
    return publishResult.data
}


export const getGroups = async (slug) => {
    const query = gql`
    query MyQuery($slug: String!) {
  groupsConnection(where: {category: {slug: $slug}}) {
    edges {
      node {
        id
        description
        title
        prerequis
        difficulty
        createdAt
        premium
        slug
        image {
        url
        }
        createdAt
        posts {
          excerpt
          premium
          prerequis
          slug
          title
        }
      }
    }
  }
}

  `;

    const result = await request(graphqlAPI, query, {slug});
    const sortedResult = await result.groupsConnection.edges.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
            return 1
        }
        return -1
    })
    return sortedResult
}


export const getGroupsPosts = async (slug) => {
    const query = gql`
    query MyQuery($slug: String!) {
  groupsConnection(where: {slug: $slug}) {
    edges {
      node {
        id
        description
        title
        image {
        url
        }
        createdAt
        posts {
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
}

  `;
    const result = await request(graphqlAPI, query, {slug});
    return result.groupsConnection.edges[0].node.posts
};


export const getGroupsPaths = async () => {
    const query = gql`
    query GetGroups {
    groups {
    title
    slug
    }
    }
    `
    const result = await request(graphqlAPI, query);
    return result.groups;
}


export const getPremiumPosts = async () => {
    const query = gql`
    query MyQuery {
  postsConnection(where: {premium: true}) {
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
}


export const getPreviousNextPosts = async (slug) => {
    const query = gql`
    query MyQuery($slug: String!) {
  groups(where: {posts_some: {slug: $slug}}) {
    id
    posts {
      id
      slug
      title
    }
  }
}

    `
    const posts = await request(graphqlAPI, query, {slug: slug})
        .then((result) => result.groups[0].posts)

    let previous
    let next

    posts.map((post, index, elem) => {
        if (post.slug == slug) {
        if (elem[index-1]) {
            previous = elem[index-1]
        }
        if (elem[index+1]) {
            next = elem[index+1]
        }
        }
    })


    return {previous: previous, next: next}
}