import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

// https://authjs.dev/getting-started/migrating-to-v5#universal-auth
// Notice !!!, server actions v5 migration to auth, not getServerSession
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub]
})
