import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },

  debug: process.env.NODE_ENV !== 'production',

  callbacks: {
    async session({ session, token }) {
      if (token.sub)
        return { ...session, user: { ...session.user, uid: token.sub } }
      return session
    },
  },
})
