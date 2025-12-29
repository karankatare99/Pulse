import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handlers = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
        pages: {
            signIn: '/api/auth/signin',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider == "google" && user.email) {
                try {
                    const existingUser = await prisma.user.upsert({
                        where: { email: user.email },
                        update: { name: user.name! },
                        create: {
                        name: user.name!,
                        email: user.email
                        }
                    })
                    console.log("User:", existingUser.email)
                } catch(e) {
                    console.log(e)
                    return false
                }
            }
            return true
        },
    }
})

export {
    handlers as GET,
    handlers as POST
}