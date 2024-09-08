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
import { Link, useNavigate, useParams } from "react-router-dom";
import reqService from "@/appwrite/req.config";


const Requests = () => {
    const [doc, setDoc] = useState({
    title: "",
    content: "",
    });
    const [userId, setUserId] = useState("");
    const [userLabel, setUserLabel] = useState("");
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
            const docs = await reqService.createReq(doc.title, doc.content, userId);
            console.log("Doc ADDED SUCCESSFULLY", docs);
            setDoc({
                title: "",
                content: "",
            });
        } catch (error) {
        console.log("ERROR ON ADDING Doc ON FRONT-END", error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await reqService.deleteReq(postId);
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
            setUserLabel(userData.labels[0]);
            console.log("USER LOGGED IN SUCCESSFULLY");
            console.log(userLabel);
        }

        const docData = await reqService.getReqs([]);
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
        {/* add req. section  */}
        <Card className='shadow-lg'>
            <CardHeader>
            <CardTitle className='text-[#FC5B3F]'>Add Requests</CardTitle>
            <CardDescription>
                Add your Requests in a single click.
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

        {/* all requests section  */}
        {loaderK ? (
            <div className="mt-10 text-center">
            <div className="loader mx-auto"></div>
            </div>
        ) : (
            <div className="mt-10">
            <h2 className="text-xl font-semibold text-[#FC5B3F]">All Requests ({length})</h2>

            {Object.keys(finalDocs).length ? (
                <div className="mt-10 flex gap-y-6 justify-center items-center">
                    <ul className="flex flex-col justify-center flex-wrap lg:flex-row gap-6">
                        {finalDocs.map((item) => (
                        <Card className="flex items-center overflow-y-auto shadow-xl pt-6 w-80 min-h-60 max-h-[450px]" key={item.$id}>
                            <CardContent className="flex w-full items-center justify-between flex-col gap-5">
                            <div className="flex flex-col text-center items-center justify-between gap-4 w-full">
                                <div className="font-semibold">{item.title.toString()}</div>
                                <div className="">
                                {" "}
                                <span>{item.content.toString()}</span>
                                </div>
                                <Link to={`/fulfill-req/${item.$id}`}>
                                    <Button className="mr-3 hover:bg-[#FC5B3F]">
                                    Fulfill Request
                                    </Button>
                                </Link>
                            </div>

                            {(item.userId === userId || userLabel === 'admin') ? <div className="flex items-center gap-8">
                                <Button
                                className="flex items-center gap-1 bg-[#FC5B3F] hover:text-white"
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
                No Requests available.
                </div>
            )}
            </div>
        )}
        </div>
    );
};

export default Requests;