export function checkAppAuthorization(req) {

    if (req.headers["authorization"] != process.env.NEXT_PUBLIC_APP_AUTHORIZATION) {
        return 0
    }
    return 1
}