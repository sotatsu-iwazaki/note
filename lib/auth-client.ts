import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient()

export const signIn = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: `${process.env.BETTER_AUTH_URL}/dashboard`
    })
}

export const signOut = async () => {
    await authClient.signOut()
}

export const getClientSession = async () => {
    return authClient.getSession()
}
