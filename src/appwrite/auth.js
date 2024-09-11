import conf from "../conf/conf";
import { Client, Account } from "appwrite";

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // GET CURRENT USER
    async getCurrentAccount() {
        try {
        return await this.account.get();
        } catch (error) {
        throw console.log("ERROR ON FETCHING CURRENT ACCOUNT (USER)", error);
        }
    }

    // TO LOGOUT USER
    async logoutAccount() {
        try {
        return this.account.deleteSessions();
        } catch (error) {
        throw console.log("ERROR ON DELETING ACCOUNT (USER)", error);
        }
    }

    async loginWithGoogle() {
        try {
        // return this.account.createOAuth2Session(
        //     'google',
        //     'http://localhost:5173',
        //     'http://localhost:5173/auth'
        // );
        // return this.account.createOAuth2Session(
        //   'google',
        //   'http://192.168.1.6:5173',
        //   'http://192.168.1.6:5173/auth'
        // );
        return this.account.createOAuth2Session(
            "google",
            "https://share-sphere-murex.vercel.app/",
            "https://share-sphere-murex.vercel.app/auth"
        );
        } catch (error) {
        console.log("ERROR WHILE DOING GOOGLE AUTH", error);
        }
    }
}

const authservice = new Authservice();
export default authservice;
