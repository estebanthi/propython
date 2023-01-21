export function checkAppAuthorization(req) {

    if (req.headers["authorization"] != process.env.NEXT_PUBLIC_APP_AUTHORIZATION) {
        return 0
    }
    return 1
}

export function modifyPostCreatedAt(post) {
    const offset = process.env.DATE_OFFSET || 0; // get the offset from the environment variable or use 0 if it's not set
    const postDate = new Date(post.createdAt);
    const newDate = new Date(postDate.getTime() + (offset * 24 * 60 * 60 * 1000)); // offset the postDate by the number of days specified in the offset variable
    post.createdAt = newDate;
    return post;
}