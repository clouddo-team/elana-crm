import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
        email:{label:'Email',type:'email',placeholder:'email'},
        password:{label:'Password',type:'password',placeholder:'password'},
    },
    async authorize(credentials)
    {
        if(!credentials?.email || !credentials?.password)
            return null;

        const user = await prisma.user.findUnique({where:{email:credentials.email}});

        if (!user) return null;

       const passwordMatch = await bcrypt.compare(credentials.password,user.hashedPassword!);

       return passwordMatch ? user : null;
}})],
  session:
  {
    strategy: "jwt"
  }
};

export default authOptions;