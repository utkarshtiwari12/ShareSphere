const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteStudentCollectionId: String(
        import.meta.env.VITE_APPWRITE_STUDENT_COLLECTION_ID
    ),
    appwriteTeacherCollectionId: String(
        import.meta.env.VITE_APPWRITE_TEACHER_COLLECTION_ID
    ),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
