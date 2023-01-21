export function checkAppAuthorization(req) {

    if (req.headers["authorization"] != process.env.NEXT_PUBLIC_APP_AUTHORIZATION) {
        return 0
    }
    return 1
}

export function modifyPostCreatedAt(post) {
    const offset = process.env.DATE_OFFSET || 0;
    const referenceDate = new Date(2022, 8, 1);

    const postDate = new Date(post.createdAt);
    const diff = referenceDate.getTime() - postDate.getTime();
    console.log(diff)
    console.log(postDate)
    console.log(referenceDate)
    let targetDate = new Date();
    targetDate.setTime(targetDate.getTime() - diff);
    targetDate.setDate(targetDate.getDate() - offset);
    post.createdAt = targetDate
    return post
}
