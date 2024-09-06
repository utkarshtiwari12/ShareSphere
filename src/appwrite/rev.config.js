import conf from "../conf/conf";

import { Client, ID, Databases } from "appwrite";

export class RevService {
    client = new Client();
    databases;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createRev( title, content, userId ) {
        try {
        return await this.databases.createDocument(
            conf.appwriteDatabseId,
            conf.appwriterReviewCollectionId,
            ID.unique(),
            {
            title,
            content,
            userId,
            }
        );
        } catch (error) {
        console.log("Appwrite service :: createRev :: error", error);
        }
    }

    async updateRev( id, {title, content, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabseId,
                conf.appwriterReviewCollectionId,
                id,
                {
                    title,
                    content,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateRev :: error", error);
        }
    }

    async deleteRev(id) {
        try {
        return await this.databases.deleteDocument(
            conf.appwriteDatabseId,
            conf.appwriterReviewCollectionId,
            id
        );
        } catch (error) {
        throw console.log("Appwrite service :: deleteRev:: error", error);
        }
    }
    async getRev(id) {
        try {
        return await this.databases.getDocument(
            conf.appwriteDatabseId,
            conf.appwriterReviewCollectionId,
            id
        );
        } catch (error) {
        throw console.log("Appwrite service :: getRev :: error", error);
        }
    }
    async getRevs() {
        try {
        return await this.databases.listDocuments(
            conf.appwriteDatabseId,
            conf.appwriterReviewCollectionId,
        );
        } catch (error) {
        throw console.log("Appwrite service :: getRevs :: error", error);
        }
    }
}

const revService = new RevService();

export default revService;
