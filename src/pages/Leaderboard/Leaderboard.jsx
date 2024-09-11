import React, { useState, useEffect, useCallback } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import authservice from "@/appwrite/auth";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import stuService from "@/appwrite/stu.config";
import fileService from "@/appwrite/fileService";
import reqService from "@/appwrite/req.config";

const groupDocsByUserId = (docs) => {
    return docs.reduce((groupedDocs, doc) => {
        const user = doc.userId;
    if (!groupedDocs[user]) {
        groupedDocs[user] = [];
    }

    groupedDocs[user].push(doc);
    return groupedDocs;
    }, {});
};

function Leaderboard() {

    const [userId, setUserId] = useState("");
    const [userLabel, setUserLabel] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loaderK, setLoaderK] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [length, setLength] = useState(0);
    const [downURL, setDownURL] = useState("");
    const [finalDocs, setFinalDocs] = useState({});

    const fetchUser = useCallback(async () => {
        try {
        const userData = await authservice.getCurrentAccount();
        if (userData) {
            dispatch(login(userData));
            setUserId(userData.$id);
            setUserLabel(userData.labels[0]);
            console.log("USER LOGGED IN SUCCESSFULLY");
            console.log(userLabel);
        }

        const docData = await stuService.getDocs([]);
        const filteredDocs = docData.documents.filter(
            (doc) => doc.userId
        );
            setLength(filteredDocs.length);

            const groupedDocs = groupDocsByUserId(filteredDocs);

            console.log(groupedDocs);
            
            
            if (filteredDocs) {
                setFinalDocs(filteredDocs);
            } else {
                setFinalDocs({});
            }

        setLoaderK(false);
        }
        
        catch (error) {
        console.log("ERROR:", error);
        setLoaderK(false);
        navigate("/auth");
        }
    }, [dispatch, navigate, userId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div className="lg:px-[4rem] px-5 pt-10 py-[1rem] font-poppins flex justify-center items-center">
        <h1 className="text-5xl lg:text-9xl text-center capitalize">
            LeaderboardPage <br /> coming soon...
        </h1>
        </div>
    );
}

export default Leaderboard;