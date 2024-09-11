import React, { useState, useEffect, useCallback } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import authservice from "@/appwrite/auth";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import revService from "@/appwrite/rev.config";

function Review() {

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
            if (doc.content.length < 300) {
                const docs = await revService.createRev(doc.title, doc.content, userId);
            console.log("Req ADDED SUCCESSFULLY", docs);
            setDoc({
                title: "",
                content: "",
            });
            }
            else {
                alert("More than 300 characters");
            }
        } catch (error) {
        console.log("ERROR ON ADDING Req ON FRONT-END", error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await revService.deleteRev(postId);
        console.log("Req DELETED SUCCESSFULLY");
        } catch (error) {
        console.log("ERROR ON DELETEING Req ON FRONT-END", error);
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

        const docData = await revService.getRevs([]);
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
        <div className="lg:px-[4rem] px-5 pt-10 py-[1rem] min-h-screen font-poppins flex flex-col justify-center items-center bg-gradient-to-br from-[#F1F9FB] to-[#D5F2F8]">

        <div className="w-full mb-8 lg:mb-16">
            <Card className='shadow-lg'>
            <CardHeader>
            <CardTitle className='text-[#024F55]'>Add Reviews</CardTitle>
            <CardDescription>
                Add your Reviews about the platform and we'll try our best to work on them.
            </CardDescription>
            </CardHeader>
            <form action="" method="post" onSubmit={handleSubmit}>
            <CardContent>
                <div className="grid lg:grid-cols-3 gap-5 lg:gap-[3rem]">
                <div className="">
                    <Label htmlFor="title">Your Name</Label>
                    <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="FullName"
                    className="capitalize"
                    value={doc.title}
                    onChange={handleChange}
                    required={true}
                    />
                </div>

                <div className="">
                    <Label htmlFor="content">Your Review/Feedback</Label>
                    <Input
                    type="text"
                    id="content"
                    name="content"
                    placeholder="Review"
                    className="capitalize"
                    value={doc.content}
                    onChange={handleChange}
                    required={true}
                    />
                </div>

                <div className="flex flex-col gap-2 justify-end">
                    <Button
                    type="submit"
                    className="flex items-center gap-1 mt-3 lg:mt-0 bg-[#3C949E] hover:bg-[#024F55]"
                    >
                    Add Review
                    </Button>
                </div>
                </div>
            </CardContent>
            </form>
        </Card>
        </div>

        {loaderK ?
                (<div className="mt-10 text-center">
                <div className="loader mx-auto"></div>
                </div>)
                :
                (
                    <div>
                        {Object.keys(finalDocs).length ?
                            (
                                <Carousel className="w-full max-w-[70vw] max-h-[70vh] shadow-xl p-8">
                            <CarouselContent className='max-h-[60vh] flex items-center'>
                                {finalDocs.map((item) => (
                                <CarouselItem key={item.$id}>
                                    <div className="p-1">
                                    <Card>
                                        <CardContent className="flex w-full items-center justify-between flex-col gap-5">
                                            <div className="flex flex-col items-center justify-between gap-4 w-full">
                                                <div className="font-semibold mt-4">{item.title.toString()}</div>
                                                <div className="">
                                                {" "}
                                                <span>{item.content.toString()}</span>
                                                </div>
                                            </div>

                                            {(item.userId === userId || userLabel === 'admin') ? <div className="flex items-center gap-8">
                                                <Button
                                                className="flex items-center gap-1 bg-[#3C949E] hover:bg-[#024F55]"
                                                onClick={() => handleDelete(item.$id)}
                                                >
                                                <i className="fa-solid fa-trash"></i>
                                                </Button>
                                            </div> : (null) }
                                        </CardContent>
                                    </Card>
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className='text-[#024F55]'/>
                            <CarouselNext className='text-[#024F55]'/>
                        </Carousel>
                            ) :
                            (
                                <div className="mt-10 flex flex-col gap-y-6">
                                    No Reviews available.
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Review;