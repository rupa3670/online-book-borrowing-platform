import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

dns.setDefaultResultOrder("ipv4first")
dns.setServers(['8.8.8.8','8.8.4.4'])

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("online_book_library");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true,
  },
  trustedOrigins: [
    "https://online-book-borrowing-platform-six.vercel.app",
    "http://localhost:3000"
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});


// import dns from "node:dns";
// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// dns.setDefaultResultOrder("ipv4first");
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// if (!global._mongoClient) {
//   global._mongoClient = new MongoClient(process.env.MONGO_URI);
// }
// const client = global._mongoClient;
// const db = client.db("online_book_library");

// export const auth = betterAuth({
//   database: mongodbAdapter(db),
  
//   baseURL: process.env.BETTER_AUTH_URL, 

//   emailAndPassword: { 
//     enabled: true,
//   },
  
//   trustedHeaders: true,
//   advanced: {
//     useSecureCookies: true,
//     crossSubDomainCookie: true,
//   },

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   },
// });