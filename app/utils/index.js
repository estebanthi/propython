export function checkAppAuthorization(req) {

    if (req.headers["authorization"] != process.env.NEXT_PUBLIC_APP_AUTHORIZATION) {
        return 0
    }
    return 1
}

export function modifyPostCreatedAt(post) {
    const referenceDate = new Date(2022, 9, 17);
    const postDate = new Date(post.createdAt);

    const deltaTime = referenceDate.getTime() - postDate.getTime();

    const dateNow = new Date();
    const newDate = new Date(dateNow.getTime() - deltaTime);

    post.createdAt = newDate
    return post
}