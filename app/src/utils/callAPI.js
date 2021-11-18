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
    var data = await axios.get(url, config).then((res) => res.data)
    return data
}

const post = async function (url) {
    const appToken = generateTokenForApp()
    const tokenAuth = "Bearer "+appToken
    let config = {
        headers: {
            authorization:tokenAuth
        }
    }
    await axios.post(url, {}, config)
}


module.exports = {
    get:get,
    post:post
}