import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
// import SnapchatProvider from "next-auth/providers/snapchat";

import axios from "axios";

const options = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      state: false,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    GoogleProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        console.log("User is not allowed to sign in");
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect", { "url": url });
      // if (url.startsWith(baseUrl)) return url
      // //Allows relative callback URLs
      // else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      return baseUrl
    },
    async session({ session, token, daily }) {
      // Send properties to the client, like an access_token from a provider.

      session.accessToken = token.accessToken;

      await axios('https://web-universal.irlgames.app/api/v1/login_with_facebook', {
        method: "POST",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          "accessToken": token?.accessToken,
          "game_name": "Resistance",
          "os_name": 'Web',
          "os_version": "",
          "device_manufacturer": "",
          "device_model": "",
          "device_id": ""
        },
      }).then(function (api_response) {
        session.token = api_response.data.token;
        session.user.info = api_response.data.entity;
        // session = null;
      }).catch(function (error) {
        session = null;
        console.log("[E]: Error from local login",error);
      });
      // console.log(session);
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("JWT",{ token, user, account, profile, isNewUser })
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  },
  pages: {
    signIn: "/login",
  },
  database: {},
};

export default (req, res) => {
  // if (req.url === "/api/auth/session?update") {
  //   // Session call updates cookie, redirect to / afterwards
  //   const endResponse = res.end as (cb?: () => void) => void;
  //   res.end = (cb: () => void) => {
  //     res.setHeader("Location", "/");
  //     res.status(301);
  //     return endResponse.apply(res, [cb]);
  //   };
  //   return NextAuth(req, res, options);
  // } else {
  //   return NextAuth(req, res, options);
  // }
  return NextAuth(req, res, options)
};

// import NextAuth from "next-auth"
// // import log from "logging-service";

// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
// // import AppleProvider from "next-auth/providers/apple"
// // import EmailProvider from "next-auth/providers/email"

// // For more information on each option (and a full list of options) go to
// // https://next-auth.js.org/configuration/options
// export default NextAuth({
//   // https://next-auth.js.org/configuration/providers
//   providers: [
//     /* EmailProvider({
//          server: process.env.EMAIL_SERVER,
//          from: process.env.EMAIL_FROM,
//        }),
//     // Temporarily removing the Apple provider from the demo site as the
//     // callback URL for it needs updating due to Vercel changing domains
      
//     Providers.Apple({
//       clientId: process.env.APPLE_ID,
//       clientSecret: {
//         appleId: process.env.APPLE_ID,
//         teamId: process.env.APPLE_TEAM_ID,
//         privateKey: process.env.APPLE_PRIVATE_KEY,
//         keyId: process.env.APPLE_KEY_ID,
//       },
//     }),
//     */
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID,
//       clientSecret: process.env.FACEBOOK_SECRET,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//       // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
//       scope: "read:user",
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     TwitterProvider({
//       clientId: process.env.TWITTER_ID,
//       clientSecret: process.env.TWITTER_SECRET,
//     }),
//     Auth0Provider({
//       clientId: process.env.AUTH0_ID,
//       clientSecret: process.env.AUTH0_SECRET,
//       issuer: process.env.AUTH0_ISSUER,
//     }),
//   ],
//   // The secret should be set to a reasonably long random string.
//   // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
//   // a separate secret is defined explicitly for encrypting the JWT.
//   secret: process.env.SECRET,

//   session: {
//     // Use JSON Web Tokens for session instead of database sessions.
//     // This option can be used with or without a database for users/accounts.
//     // Note: `strategy` should be set to 'jwt' if no database is used.
//     strategy: "jwt",

//     // Seconds - How long until an idle session expires and is no longer valid.
//     // maxAge: 30 * 24 * 60 * 60, // 30 days

//     // Seconds - Throttle how frequently to write to database to extend a session.
//     // Use it to limit write operations. Set to 0 to always update the database.
//     // Note: This option is ignored if using JSON Web Tokens
//     // updateAge: 24 * 60 * 60, // 24 hours
//   },

//   // JSON Web tokens are only used for sessions if the `jwt: true` session
//   // option is set - or by default if no database is specified.
//   // https://next-auth.js.org/configuration/options#jwt
//   jwt: {
//     // You can define your own encode/decode functions for signing and encryption
//     // if you want to override the default behaviour.
//     // encode: async ({ secret, token, maxAge }) => {},
//     // decode: async ({ secret, token, maxAge }) => {},
//   },

//   // You can define custom pages to override the built-in ones. These will be regular Next.js pages
//   // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
//   // The routes shown here are the default URLs that will be used when a custom
//   // pages is not specified for that route.
//   // https://next-auth.js.org/configuration/pages
//   pages: {
//     signIn: 'https://localhost:3000/auth/signin',  // Displays signin buttons
//     // signOut: '/auth/signout', // Displays form with sign out button
//     // error: '/auth/error', // Error code passed in query string as ?error=
//     // verifyRequest: '/auth/verify-request', // Used for check email page
//     // newUser: null // If set, new users will be directed here on first sign in
//   },

//   // Callbacks are asynchronous functions you can use to control what happens
//   // when an action is performed.
//   // https://next-auth.js.org/configuration/callbacks
//   callbacks: {
//     // async signIn({ user, account, profile, email, credentials }) { return true },
//     // async redirect({ url, baseUrl }) { return baseUrl },
//     // async session({ session, token, user }) { return session },
//     // async jwt({ token, user, account, profile, isNewUser }) { return token }
//   },

//   // Events are useful for logging
//   // https://next-auth.js.org/configuration/events
//   events: {},

//   // You can set the theme to 'light', 'dark' or use 'auto' to default to the
//   // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
//   theme: {
//     colorScheme: "light",
//   },

//   // Enable debug messages in the console if you are having problems
//   debug: false,
//   // logger: {
//   //   error(code, metadata) {
//   //     log.error(code, metadata)
//   //   },
//   //   warn(code) {
//   //     log.warn(code)
//   //   },
//   //   debug(code, metadata) {
//   //     log.debug(code, metadata)
//   //   }
//   // }
// })
