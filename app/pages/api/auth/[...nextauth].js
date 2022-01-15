import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text"},
                password: {  label: "Mot de passe", type: "password" }
            },
            async authorize(credentials, req) {

                const res = await axios.post(process.env.NEXT_PUBLIC_BASE_URL+"/api/users/login", {email: credentials.email, password:credentials.password})
                const user = res.data.user
                // If no error and we have user data, return it
                if (user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    pages: {
        signIn: "/auth/sign-in"
    },
    secret: process.env.AUTH_HASH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 60,
    },
    callbacks: {
        async jwt({ token, account , user}) {
            if (user)
            {

                let expirationDate = new Date(user.premiumUntil)
                if (user.unlimitedPremium) {expirationDate = "unlimited"}
                token.username = user.username
                token.isPremium = user.isPremium
                token.premiumExpiration = expirationDate
                token.password = user.password
            }
            return token
        },

        async session({ session, token }) {
            if (token) {
                session.user = {
                    username: token.username,
                    email: token.email,
                    isPremium: token.isPremium,
                    id: token.sub,
                    premiumExpiration: token.premiumExpiration,
                    password: token.password
                }
            }
            return session
        },
   
    }
})