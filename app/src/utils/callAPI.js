const {generateTokenForApp} = require("./jwt.utils");
const axios = require("axios");


const get = async function (url) {
    const appToken = generateTokenForApp()
    const tokenAuth = "Bearer "+appToken
    let config = {
        headers: {
            authorization:tokenAuth
        }
    }
    const data = await axios.get(url, config).then((res) => res.data)
    return data
}

const post = async function (url, data) {
    const appToken = generateTokenForApp()
    const tokenAuth = "Bearer "+appToken
    let config = {
        headers: {
            authorization:tokenAuth
        }
    }
    const response = await axios.post(url, data, {headers:{authorization:tokenAuth}})
        .then((res) => res.data)
    return response
}


module.exports = {
    get:get,
    post:post
}