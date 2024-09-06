import conf from "../conf/conf";

import { Client, ID, Databases } from "appwrite";

export class ReqService {
    client = new Client();
    databases;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createReq( title, content, userId ) {
        try {
        return await this.databases.createDocument(
            conf.appwriteDatabseId,
            conf.appwriterRequestCollectionId,
            ID.unique(),
            {
            title,
            content,
            userId,
            }
        );
        } catch (error) {
        console.log("Appwrite service :: createReq :: error", error);
        }
    }

    async updateReq( id, {title, content, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabseId,
                conf.appwriterRequestCollectionId,
                id,
                {
                    title,
                    content,
                    featuredDoc,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateReq :: error", error);
        }
    }

    async deleteReq(id) {
        try {
        return await this.databases.deleteDocument(
            conf.appwriteDatabseId,
            conf.appwriterRequestCollectionId,
            id
        );
        } catch (error) {
        throw console.log("Appwrite service :: deleteReq:: error", error);
        }
    }
    async getReq(id) {
        try {
        return await this.databases.getDocument(
            conf.appwriteDatabseId,
            conf.appwriterRequestCollectionId,
            id
        );
        } catch (error) {
        throw console.log("Appwrite service :: getReq :: error", error);
        }
    }
    async getReqs() {
        try {
        return await this.databases.listDocuments(
            conf.appwriteDatabseId,
            conf.appwriterRequestCollectionId,
        );
        } catch (error) {
        throw console.log("Appwrite service :: getReqs :: error", error);
        }
    }
}

const reqService = new ReqService();

export default reqService;
