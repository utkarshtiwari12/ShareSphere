import conf from "../conf/conf";

import { Client, ID, Databases } from "appwrite";

export class StuService {
    client = new Client();
    databases;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createDoc( title, content, featuredDoc, userId ) {
        try {
        return await this.databases.createDocument(
            conf.appwriteDatabseId,
            conf.appwriteStudentCollectionId,
            ID.unique(),
            {
            title,
            content,
            featuredDoc,
            userId,
            }
        );
        } catch (error) {
        console.log("Appwrite service :: createDoc :: error", error);
        }
    }

    async updateDoc( id, {title, content, featuredDoc, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabseId,
                conf.appwriteStudentCollectionId,
                id,
                {
                    title,
                    content,
                    featuredDoc,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deleteDoc(id) {
        try {
        return await this.databases.deleteDocument(
            conf.appwriteDatabseId,
            conf.appwriteStudentCollectionId,
            id
        );
        } catch (error) {
        throw console.log("Appwrite service :: deleteDoc :: error", error);
        }
    }
    async getDoc(id) {
        try {
        return await this.databases.getDocument(
            conf.appwriteDatabseId,
            conf.appwriteStudentCollectionId,
            id
        );
        } catch (error) {
        throw console.log("Appwrite service :: getDoc :: error", error);
        }
    }
    async getDocs() {
        try {
        return await this.databases.listDocuments(
            conf.appwriteDatabseId,
            conf.appwriteStudentCollectionId,
        );
        } catch (error) {
        throw console.log("Appwrite service :: getDocs :: error", error);
        }
    }
}

const stuService = new StuService();

export default stuService;
