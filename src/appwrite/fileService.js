import conf from "../conf/conf";

import { Client, ID, Storage } from "appwrite";

export class FileService {
    client = new Client();
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.bucket = new Storage(this.client);
    }

    // file service

    async uploadFile(file) {
        try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
        } catch (error) {
        console.log("Appwrite service :: uploadFile :: error", error);
        }
    }

    async deleteFile(fileId) {
        try {
        return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
        } catch (error) {
        throw console.log("Appwrite service :: deleteFile :: error", error);
        }
    }

    getFilePreview(fileID) {
        return this.bucket.getFileView(conf.appwriteBucketId, fileID);
    }

    downloadFile(fileId) {
        return this.bucket.getFileDownload(conf.appwriteBucketId, fileId);
    }
}

const fileService = new FileService();

export default fileService;
