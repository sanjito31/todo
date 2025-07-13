import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
// import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import Credentials from "next-auth/providers/credentials"
import { randomUUID } from "crypto"
// import { cookies } from "next/headers"
import { encode as defaultEncode, decode as defaultDecode, JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    credentials?: boolean,
    sessionToken?: string,
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        // User login via email and password
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            //: Record<string, unknown> | undefined : Promise<User | null>
            authorize: async(credentials) => {
                // console.log("authorize called with: ", credentials)
                if(!credentials || !credentials?.email || !credentials?.password) return null;
                if(typeof credentials.email !== 'string' || typeof credentials.password !== 'string') return null

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if(!user || !user.hashedPassword) return null 

                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)

                if(!isValid) return null
                console.log("User successfully authorized.")

                // User has been validated

                return {
                    id: user.id.toString(),
                    email: user.email.toString(),
                    name: user.name?.toString(),
                }
            }
        }),
        // User login via GitHub
        GitHub,
    ],
    session: {
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
        strategy: "database"
    },
    pages: {
        signIn: '/login',
    },
    debug: process.env.NODE_ENV !== "production",
    jwt: {
        encode: async function (params) {
            console.log("ENCODE:", params.token?.toString())
            if (params.token?.credentials) {
                const sessionToken = randomUUID()

                if (!params.token.sub) {
                    throw new Error("No user ID found in token")
                }

                const createdSession = await prisma.session.create({
                    data: {
                        sessionToken: sessionToken,
                        userId: params.token.sub,
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    }
                })

                if (!createdSession) {
                    throw new Error("Failed to create session")
                }

                return sessionToken
            }
            return defaultEncode(params);
        },
        decode: async (params) => {
            console.log("DECODE:", params.token?.toString())
           
            if (params.token?.includes(".")) {
                return defaultDecode(params)
            }
            
            return { sessionToken: params.token } as JWT
        },
    },
    callbacks: {
        async signIn({ user, account }) {

            if(account?.provider === 'credentials' && user?.id) {
                // Create User account if necessary
                if(!createAccount(user.id)) {
                    console.log("Error creating or finding account.")
                    return false
                }
                // await prisma.account.upsert({
                //     where: {
                //         provider_providerAccountId: {
                //             provider: "credentials",
                //             providerAccountId: user.id.toString()
                //         }
                //     },
                //     update: {},
                //     create: {
                //         userId: user.id.toString(),
                //         type: "credentials",
                //         provider: "credentials",
                //         providerAccountId: user.id.toString(),
                //     }
                // })

                // const sessionToken = randomUUID()
                // const expires = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))

                // await prisma.session.create({
                //     data: {
                //         userId: user.id,
                //         sessionToken: sessionToken, 
                //         expires: expires
                //     }
                // })

                // const cookieStore = await cookies()
                // cookieStore.set({
                //     name: "next-auth.session-token",
                //     value: sessionToken,
                //     httpOnly: true,
                //     sameSite: 'lax',
                //     path: '/',
                //     secure: false,
                //     expires: expires,
                // })

            }
            return true;
        },
        async jwt({ token, account }) {

            if (account?.provider === "credentials") {
                token.credentials = true
            }
            return token
        },
        // async session( { session, token }) {
            
        //     if(token.sessionToken) {
        //         const sess = await prisma.session.findFirst({
        //             where: { sessionToken: token.sessionToken }
        //         })
        //         if(sess) {
        //             session.sessionToken = sess.sessionToken
        //             session.user.id = sess.userId
        //         }
        //     }   
            

        //     // if(token.sessionToken){
        //     //     session.sessionToken = token.sessionToken.toString()
        //     //     session.user.id = token.sub!
        //     // }
        //     return session
        // }
    }
})

export async function createNewUser(email: string, password: string, name: string) {
    
    const alreadyExists = await prisma.user.findUnique({
        where: { email }
    })

    if(alreadyExists) throw new Error("User already exists.")

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await prisma.user.create({
        data: {
            email: email,
            hashedPassword: hashedPassword,
            name: name,
        }
    })

    return newUser
}

// export async function credentialSignIn(formData: FormData) {

//     const email = formData.get('email') as string
//     const password = formData.get('password') as string


//     console.log("credentials passed: ", email, password)

//     try {
//       const result = await signIn('credentials', {
//         email: email,
//         password: password,
//         redirect: false,
//       })

//       if(result?.ok) {

        

//         await prisma.


//       } else {
//         return null
//       }

//     }
// }

export async function createAccount(userId: string) {

    return await prisma.account.upsert({
        where: {
            provider_providerAccountId: {
                provider: "credentials",
                providerAccountId: userId.toString()
            }
        },
        update: {},
        create: {
            userId: userId.toString(),
            type: "credentials",
            provider: "credentials",
            providerAccountId: userId.toString(),
        }
    })
}



// export async function createUserSession(sessionToken: string, expires: Date, ) {
    
//     const sessionToken = randomUUID()
//     const expires = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))

//     await prisma.session.create({
//         data: {
//             userId: user.id,
//             sessionToken: sessionToken, 
//             expires: expires
//         }
//     }