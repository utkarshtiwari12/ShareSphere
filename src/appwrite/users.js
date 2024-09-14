import {Client, Users } from "node-appwrite";
import conf from "@/conf/conf";

export class UserService {
    client = new Client();
    users;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId) // Your project ID
        .setKey(conf.appwriteApiKey); // Your secret API key

        this.users = new Users(this.client);
    }

    async getUsers() {
        try {
        return await this.users.list();
        } catch (error) {
        throw console.log("ERROR ON FETCHING ALL (USERS)", error);
        }
    }
}

const userService = new UserService();
export default userService;
