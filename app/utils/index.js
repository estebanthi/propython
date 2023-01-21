export function checkAppAuthorization(req) {

    if (req.headers["authorization"] != process.env.NEXT_PUBLIC_APP_AUTHORIZATION) {
        return 0
    }
    return 1
}

export function modifyPostCreatedAt(post) {
    const offset = process.env.DATE_OFFSET || 0;
    const referenceDate = new Date("2022-09-01T00:00:00.000Z");

    const postDate = new Date(post.createdAt);
    const diff = referenceDate.getTime() - postDate.getTime();
    let targetDate = new Date();
    targetDate.setTime(targetDate.getTime() - diff);
    targetDate.setDate(targetDate.getDate() - offset);
    post.createdAt = targetDate
    return post
}