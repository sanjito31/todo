import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from 'bcrypt'
import Credentials from "next-auth/providers/credentials"
import { randomUUID } from "crypto"
import { encode as defaultEncode, decode as defaultDecode, JWT } from "next-auth/jwt"
import type { User } from "next-auth"
import { CredentialsSignin } from "next-auth"

class CredentialAuthorizationError extends CredentialsSignin {
    code: string
    constructor(message: string) {
        super()
        this.code = message;
    }
}


const maxAge = 7 * 24 * 60 * 60;

// Extend JWT to be able to hijack and convert it into session token for credential login
declare module "next-auth/jwt" {
  interface JWT {
    credentials?: boolean,
    sessionToken?: string,
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({

    // Database
    adapter: PrismaAdapter(prisma),

    // Secret phrase for NEXTAUTH
    secret: process.env.NEXTAUTH_SECRET,

    // Methods to log in
    providers: [
        // User login via email and password
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            // Authorize user's log in information
            authorize: async(
                credentials: Record<string, unknown> | undefined)
                : Promise<User | null> => {

                // Credential type check
                if(!credentials || !credentials?.email || !credentials?.password) return null;
                if(typeof credentials.email !== 'string' || typeof credentials.password !== 'string') return null

                let user = null;
                // Find user via email
                try {
                    user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    })
                } catch(err) {
                    console.log(err)
                    throw new CredentialAuthorizationError("")
                }
                
                // User or password not found
                if(!user || !user.hashedPassword) 
                    throw new CredentialAuthorizationError("User account does not exist.")

                if(!createAccount(user.id)) {
                    console.log("Error creating or finding account.")
                    throw new CredentialAuthorizationError("")
                }

                // Check user's password against DB 
                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)
                if(!isValid) 
                    throw new CredentialAuthorizationError("Invalid username or password.")

                // User has been validated
                console.log("User successfully authorized.")
                
                // Return User object to client
                return {
                    id: user.id.toString(),
                    email: user.email.toString(),
                    name: user.name?.toString(),
                }
            }
        }),
        // User login via GitHub
        GitHub,
        Google,
    ],
    session: {
        maxAge: maxAge,       // 7 days
        updateAge: 24 * 60 * 60,        // 1 day
        strategy: "database"            // Store sessions in database, no JWT
    },
    pages: {
        signIn: '/login',                           // only page to login
    },
    debug: process.env.NODE_ENV !== "production",   // Debug mode only in dev

    /* 
        JWT overrides for Credential login

        we need this to be able to modify the default AuthJS behavior, which only 
        uses JWT for credentials login. This method starts with the JWT callback below.

        JWT callback --> encode (hide session-token in JWT) --> client browser
        client browser --> JWT callback --> decode (recover our hidden session-token)

        In a nutshell, we intercept the automatically generate JWT and add a boolean
        to say that it is for 'credentials.' Then, we manually catch it on encode and
        decode steps and replace its native token with our own generated session
        token. This will allow a credential login to mimic the behavior of a social 
        oAuth login. The browser session-token's JWT is replaced with a session token,
        which is persisted in our database.
    */
    jwt: {
        // If the JWT has field credentials which is true, 
        // we create a session and encode it to the JWT
        encode: async function (params) {

            if (params.token?.credentials) {
                const sessionToken = randomUUID()

                if (!params.token.sub) {
                    console.log("No user ID found in token.")
                    throw new Error("No user ID found in token.")
                }

                const createdSession = await prisma.session.create({
                    data: {
                        sessionToken: sessionToken,
                        userId: params.token.sub,
                        expires: new Date(Date.now() + maxAge * 1000),
                    }
                })

                if (!createdSession) {
                    console.log("Failed to create session.")
                    throw new Error("Failed to create session.")
                }

                return sessionToken
            }

            // Else return normal JWT if not 'credentials type'
            return defaultEncode(params);
        },

        // True JWTs include two "."'s, so those can pass as is
        // Our session-token that we hid inside the 'JWT' will not have a 
        // period so we can safely decode our session token and pass it 
        // back as a JWT.
        decode: async (params) => {
           
            if (params.token?.includes(".")) {
                return defaultDecode(params)
            }
            
            return { sessionToken: params.token } as JWT
        },
    },
    /* Callbacks are important to basically intercept default behavior 
    */
    callbacks: {
        // During signIn for credential logins, we must create an account entry 
        // for our user in the DB, if it does not exist already. 
        // async signIn({ user, account }) {

        //     if(account?.provider === 'credentials' && user?.id) {
        //         if(!createAccount(user.id)) {
        //             console.log("Error creating or finding account.")
        //             throw new Error("Error creating or finding account.")
        //         }
        //     }
        //     return true;
        // },
        
        // Key part of our JWT intercept strategy. Marks JWT as 'credentials' type
        async jwt({ token, account }) {

            if (account?.provider === "credentials") {
                token.credentials = true
            }

            return token
            
        },
    }
})

/* 
    Creates a new user in our database from the /signup page
    checks for exiting user, hashes password, stores in DB, returns user with hashed pw.
*/
export async function createNewUser(email: string, password: string, name: string) {
    
    const alreadyExists = await prisma.user.findUnique({
        where: { email }
    })

    if(alreadyExists) throw new Error("User with that email already exists.")

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

/*
    Creates an account for the user if it does not exist
    Since oAuth automatically does this, this function is only used when
    trying to add 'credentials' users
    Returns account on success, null if not found
    Throws error
*/

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

// type 

// export async function userCredentialLogin(email: string, password: string) {

//     try{
//         await signIn("credentials", { 
//             email: email,
//             password: password,
//             redirect: false,
//          })

//          return {

//          }

//     } catch (err) {
//         if(err) {
//             return {
                
//             }
//         }
//     }
// }