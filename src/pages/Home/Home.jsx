import hero from '../../assets/hero-img.svg'
import React, { useEffect, useState, useCallback } from "react";
import authservice from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import StuService from "@/appwrite/stu.config";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import note from '@/assets/note.png'
import fileService from "@/appwrite/fileService";


function Home() {

    const message = "Hello, I came from your webiste.";

    const whatsappUrl =
    "https://wa.me/" + "+919621057682" + "?text=" + encodeURIComponent(message);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userLabel, setUserLabel] = useState("");
    const [username, setUsername] = useState("");
    const [loaderK, setLoaderK] = useState(false);
    const [finalDocs, setFinalDocs] = useState({});
    const [downURL, setDownURL] = useState("");

    const handleDelete = async (postId, docId) => {
        try {
            await StuService.deleteDoc(postId);
            await fileService.deleteFile(docId)
        console.log("Doc DELETED SUCCESSFULLY");
        } catch (error) {
        console.log("ERROR ON DELETEING Doc ON FRONT-END", error);
        }
    };

    const handleDownload = async (docId) => {
        try {
            const downloadedFile = fileService.downloadFile(docId);
            setDownURL(downloadedFile.href);
            console.log("Doc Got SUCCESSFULLY");
        } catch (error) {
            console.log("ERROR ON DOWNLOADING Doc ON FRONT-END", error);
        }
    }


    const fetchData = useCallback(async () => {
        try {
        setLoaderK(true);
        const userData = await authservice.getCurrentAccount();
            if (userData)
            {
            dispatch(login(userData));
            setUserId(userData.$id);
            setUsername(userData.name);
            setUserLabel(userData.labels[0]);
            console.log("USER LOGGED IN SUCCESSFULLY");
            }

            const docData = await StuService.getDocs([]);
            const filteredDocs = docData.documents.slice(0, 3);
            
            if (filteredDocs) {
                setFinalDocs(filteredDocs);
            } else {
                setFinalDocs({});
            }
        
        setLoaderK(false);
        } catch (error) {
        console.log("USER IS NOT LOGGED IN", error);
        navigate("/auth");
        }
    }, [dispatch, navigate, userId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
    <>
        <div className="w-screen h-[90vh] px-2 md:px-6 py-4 md:py-6 md:flex">
                <div className="w-full md:w-1/2 md:flex justify-center flex-col md:ml-12 px-4">
                    {username ? (<h1 className='typed-out md:text-4xl font-semibold pb-6 text-2xl'>Hello {username},</h1>) : (null)}
                <h1 className="text-black md:text-8xl font-semibold mb-10 text-6xl">
                    <span className="text-[#FC5B3F]">Welcome</span> to ShareSphere community...
                </h1>
                <p className="text-gray-600 font-semibold md:text-lg">
                    A platform where students can interact,
                </p>
                <p className="text-gray-600 font-semibold md:text-lg">
                    share &amp; gain.
                </p>
                </div>

                <img
                className="w-full md:w-1/2"
                src={hero}
                alt="main-img"
            />
            </div>
        <div className="w-screen md:h-[75vh] px-2 md:px-6 py-4 md:py-6">
        <div className="w-full h-[35%] text-center">
            <h1
            className="text-black md:text-7xl font-semibold mb-10 text-5xl max-w-[80%]"
            >
            College <span className="text-[#FC5B3F]">Resources</span> are now on your
            Fingertips...
            </h1>
        </div>

        <div className="w-full h-[65%] md:flex">
            <div className="md:w-1/2 md:h-full ml-20 pb-12">
            <p className="text-black md:text-4xl mb-10 text-3xl max-w-[70%]">
                Interact with your batchmates through this platform and get required
                Resources.
            </p>

            <div className="flex flex-col gap-4">
                <Link to={'/notes'}>
                    <button
                        className="text-[#FC5B3F] font-semibold bg-white w-80 py-[6px] px-4 rounded border-2 border-[#FC5B3F]"
                        >
                        Get Notes
                    </button>
                </Link>
                <Link to={'/requests'}>
                    <button
                className="text-white font-semibold bg-[#FC5B3F] w-80 py-[6px] px-4 rounded border-2 border-[#FC5B3F] animate-pulse -z-10"
                >
                Make a Request
                </button>
                </Link>
            </div>
            </div>
            <div className="md:w-1/2 md:h-full ml-20 pb-12">
            <p
                className="text-black md:text-4xl mb-10 md:mb-[78px] text-3xl max-w-[70%]"
            >
                Now you can help others and get rewarded every week.
            </p>

            <div className="flex flex-col gap-4">
                <Link to={'/notes'}>
                    <button
                        className="text-[#FC5B3F] font-semibold bg-white w-80 py-[6px] px-4 rounded border-2 border-[#FC5B3F]"
                        >
                        Upload MyDocs
                    </button>
                </Link>
                <Link to={'/requests'}>
                    <button
                className="text-white font-semibold bg-[#FC5B3F] w-80 py-[6px] px-4 rounded border-2 border-[#FC5B3F] animate-pulse -z-10"
                >
                Fulfill Requests
                </button>
                </Link>
            </div>
            </div>
        </div>
        </div>
            

    <div className="w-screen px-10 md:px-20 py-4 md:py-10">
        <h1 className="font-bold mb-7 md:mb-20 text-4xl md:text-5xl">
            Get frequent access of <span className="text-[#FC5B3F]">Notes.</span>
        </h1>

        {loaderK ? (
            <div className="mt-10 text-center">
            <div className="loader mx-auto"></div>
            </div>
        ) :        
        (<div className="vision px-8">
            {Object.keys(finalDocs).length ? (
                <div className="mt-10 flex gap-y-6 justify-center items-center">
                    <ul className="flex flex-col justify-center flex-wrap lg:flex-row gap-6">
                        {finalDocs.map((item) => (
                        <Card className="flex items-center overflow-y-auto shadow-xl pt-6 w-80 min-h-60 max-h-[450px]" key={item.$id}>
                            <CardContent className="flex w-full items-center justify-between flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-4 w-full">
                                <div>
                                    <img src={note} alt="note-logo" width='50px'/>
                                </div>
                                <div className="font-semibold">{item.title}</div>
                                <div className="">
                                {" "}
                                <span>{item.content}</span>
                                </div>
                                <div className="flex">
                                    <Button className='hover:bg-[#FC5B3F]'
                                    onClick={() => handleDownload(item.featuredDoc)}
                                    >
                                        <a href={downURL}><span>Download</span></a>
                                    </Button>
                                </div>
                            </div>

                            {(item.userId === userId || userLabel === 'admin') ? <div className="flex items-center gap-8">
                                <Button
                                className="flex items-center gap-1 bg-[#FC5B3F] hover:text-white"
                                onClick={() => handleDelete(item.$id, item.featuredDoc)}
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
        </div>)}
    </div>
    
    <footer className="container mx-auto mt-[5%] px-7 md:px-5">
        <div className="up flex justify-between pb-3 flex-col md:flex-row">
            <div
            className="left flex gap-5 md:gap-0 items-center flex-col md:flex-row justify-center md:justify-start"
            >
            <Link to={'/'}>
                <div className="logo">
                <h1 className="text-[#FC5B3F] font-bold text-3xl mx-10">ShareSphere</h1>
            </div>
            </Link>
            <div className="copyright text-lg font-semibold">
                &copy; 2024 ShareSphere. All rights reserved.
            </div>
            </div>
            <div className="right text-lg font-semibold">
            <ul
                className="mt-5 md:mt-0 flex gap-x-3 gap-y-2 md:gap-6 flex-wrap md:flex-nowrap justify-center md:justify-end"
            >
                <Link to={'/requests'} className='hover:border-b-2 hover:border-[#FC5B3F]'>
                    <li>Requests</li>
                </Link>
                <Link to={'/leaderboard'} className='hover:border-b-2 hover:border-[#FC5B3F]'>
                    <li>LeaderBoard</li>
                </Link>
                <Link to={'/notesByTeachers'} className='hover:border-b-2 hover:border-[#FC5B3F]'>
                    <li>NotesByTeachers</li>
                </Link>
                <Link to={whatsappUrl} className='hover:border-b-2 hover:border-[#FC5B3F] text-green-500'>
                    <li>Whatsapp Us</li>
                </Link>
            </ul>
            </div>
        </div>
        <hr />
        <div className="text-gray-600 py-6 px-6">
            ShareSphere - A notes sharing platform where students can interact, share & gain.
        </div>
        </footer>

    </>
    );
}

export default Home;