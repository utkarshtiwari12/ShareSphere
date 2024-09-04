import React, { useState, useEffect, useCallback } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import authservice from "@/appwrite/auth";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StuService from "@/appwrite/stu.config";


const Notes = () => {
    const [doc, setDoc] = useState({
    title: "",
    content: "",
    featuredDoc: ""
    });
    const [userId, setUserId] = useState("");
    const [loaderK, setLoaderK] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [length, setLength] = useState(0);
    const [finalDocs, setFinalDocs] = useState({});

    const handleChange = (e) => {
    const { name, value } = e.target;

    setDoc((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        await StuService.createDoc(doc.title, doc.content, doc.featuredDoc, userId);
        console.log("Doc ADDED SUCCESSFULLY");
        setDoc({
            title: "",
            content: "",
            featuredDoc: ""
        });
        } catch (error) {
        console.log("ERROR ON ADDING Doc ON FRONT-END", error);
        }
    };

    const handleDelete = async (id) => {
        try {
        await StuService.deleteDoc(id);
        console.log("Doc DELETED SUCCESSFULLY");
        } catch (error) {
        console.log("ERROR ON DELETEING Doc ON FRONT-END", error);
        }
    };

    const fetchUser = useCallback(async () => {
        try {
        const userData = await authservice.getCurrentAccount();
        if (userData) {
            dispatch(login(userData));
            setUserId(userData.$id);
            console.log("USER LOGGED IN SUCCESSFULLY");
        }

        const docData = await StuService.getDocs([]);
        const filteredDocs = docData.documents.filter(
            (doc) => doc.userId
        );
            setLength(filteredDocs.length);
            
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
    }, [dispatch, navigate, userId, handleDelete, handleSubmit]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div className="lg:px-[4rem] px-5 pt-10 py-[1rem] font-poppins">
        {/* add doc section  */}
        <Card className='shadow-lg'>
            <CardHeader>
            <CardTitle className='text-[#FC5B3F]'>Add Notes</CardTitle>
            <CardDescription>
                Add your Notes in a single click.
            </CardDescription>
            </CardHeader>
            <form action="" method="post" onSubmit={handleSubmit}>
            <CardContent>
                <div className="grid lg:grid-cols-3 gap-5 lg:gap-[3rem]">
                <div className="">
                    <Label htmlFor="title">Title</Label>
                    <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    className="capitalize"
                    value={doc.title}
                    onChange={handleChange}
                    required={true}
                    />
                </div>

                <div className="">
                    <Label htmlFor="content">Content</Label>
                    <Input
                    type="text"
                    id="content"
                    name="content"
                    placeholder="content"
                    className="capitalize"
                    value={doc.content}
                    onChange={handleChange}
                    required={true}
                    />
                </div>

                <div className="flex flex-col gap-2 justify-end">
                    <Button
                    type="submit"
                    className="flex items-center gap-1 mt-3 lg:mt-0 hover:bg-[#FC5B3F] hover:text-white"
                    >
                    Upload
                    </Button>
                </div>
                </div>
            </CardContent>
            </form>
        </Card>

        {/* all expenses section  */}
        {loaderK ? (
            <div className="mt-10 text-center">
            <div className="loader mx-auto"></div>
            </div>
        ) : (
            <div className="mt-10">
            <h2 className="text-xl font-semibold text-[#FC5B3F]">All Notes ({length})</h2>

            {Object.keys(finalDocs).length ? (
                <div className="mt-10 flex gap-y-6 justify-center items-center">
                    <ul className="flex flex-col justify-center flex-wrap lg:flex-row gap-6">
                        {finalDocs.map((item) => (
                        <Card className="flex items-center overflow-y-auto shadow-xl pt-6 w-80 min-h-60 max-h-96" key={item.$id}>
                            <CardContent className="flex w-full items-center justify-between flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-8 w-full">
                                <div className="font-semibold">{item.title}</div>
                                <div className="">
                                {" "}
                                <span>{item.content}</span>
                                </div>
                            </div>

                            {(item.userId === userId) ? <div className="flex items-center gap-8">
                                <Button
                                className="flex items-center gap-1 hover:bg-[#FC5B3F] hover:text-white"
                                onClick={() => handleDelete(item.$id)}
                                >
                                <i className="fa-solid fa-trash"></i>
                                </Button>
                            </div> : (null) }
                            </CardContent>
                        </Card>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="mt-10 flex flex-col gap-y-6">
                No Data Available. Please Upload Notes.
                </div>
            )}
            </div>
        )}
        </div>
    );
};

export default Notes;