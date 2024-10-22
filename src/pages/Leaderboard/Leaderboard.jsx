import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpDown, Trophy, Upload, Mail } from "lucide-react";
import authservice from "@/appwrite/auth";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import stuService from "@/appwrite/stu.config";

import userService from "@/appwrite/users";

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
    const [loaderK, setLoaderK] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [length, setLength] = useState(0);
    const [finalDocs, setFinalDocs] = useState({});
    const [newstate, setnewstate] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");

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

            const allUsers = userService.getUsers();
            allUsers.then((res) => {
                console.log(res.users)
                const userDocs = [];
                for (const key in groupedDocs) {
                    res.users.forEach((user) => {
                        if (key === user.$id) {
                            let obj = {
                                name: user.name,
                                docsCount: groupedDocs[key].length,
                                email: user.email
                            }
                            userDocs.push(obj);
                        }
                    })
                }
                console.log(userDocs);
                    setnewstate(userDocs);
            })
            
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
        console.log("Updated newstate:", newstate);
    }, [newstate]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const sortByDocCount = () => {
    const sortedUsers = [...newstate].sort((a, b) => 
        sortOrder === 'asc' ? a.docsCount - b.docsCount : b.docsCount - a.docsCount
    )
    setnewstate(sortedUsers)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
}
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 bg-gradient-to-br from-[#F1F9FB] to-[#D5F2F8]">
        <header className="bg-[#9BD8DB] shadow-lg">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Trophy className="mr-2 h-8 w-8 text-yellow-500" />
                Leaderboard
            </h1>
            </div>
            </header>
            
            {
                newstate.length === 0 ? (
            <div className="mt-10 text-center">
            <div className="loader mx-auto"></div>
            </div>
                ) : (
                        <main className="flex-grow">
                            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            <div className="px-4 py-6 sm:px-0">
                                <h2 className="text-2xl font-bold mb-6 text-center text-[#024F55]">Document Upload Champions</h2>
                                <div className="overflow-x-auto bg-gradient-to-tl from-[#F1F9FB] to-[#9BD8DB] shadow-md rounded-lg">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">
                                        Rank
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">
                                        Username
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">
                                        <button
                                            onClick={sortByDocCount}
                                            className="flex items-center focus:outline-none uppercase"
                                        >
                                            Document Count
                                            <ArrowUpDown className="ml-1 h-4 w-4" />
                                        </button>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider hidden md:table-cell">
                                        Email
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {newstate.map((user, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <span className="flex items-center">
                                            <Upload className="mr-2 h-4 w-4 text-green-500" />
                                            {user.docsCount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                            <span className="flex items-center">
                                            <Mail className="mr-2 h-4 w-4 text-blue-500" />
                                            {user.email}
                                            </span>
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            </div>
                        </main>
                )
            }

        <footer className="bg-[#9BD8DB] shadow mt-8 fixed min-w-full bottom-0">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-800 text-sm font-semibold">
                © 2024 Leaderboard Inc. All rights reserved.
            </p>
            </div>
        </footer>
        </div>
    );
}

export default Leaderboard;