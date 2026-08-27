import { Client, Account, Databases, Storage, Teams, ID, Query, Permission, Role } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);

export { ID, Query, Permission, Role };

export const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID;
export const BLOG_COLLECTION_ID = process.env.REACT_APP_BLOG_COLLECTION_ID || "blogs";
export const BLOG_BUCKET_ID = process.env.REACT_APP_BLOG_BUCKET_ID || "blog_images";
export const BLOG_TEAM_ID = process.env.REACT_APP_BLOG_TEAM_ID || "bloggers";

export default client;
