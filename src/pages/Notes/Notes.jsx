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
import note from '@/assets/sticky-notes.png'
import authservice from "@/appwrite/auth";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import stuService from "@/appwrite/stu.config";
import fileService from "@/appwrite/fileService";
import reqService from "@/appwrite/req.config";


const Notes = ({post}) => {
    const [doc, setDoc] = useState({
    title: "",
    content: "",
    });
    const [userId, setUserId] = useState("");
    const [userLabel, setUserLabel] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loaderK, setLoaderK] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [length, setLength] = useState(0);
    const [downURL, setDownURL] = useState("");
    const [viewURL, setViewURL] = useState("");
    const [finalDocs, setFinalDocs] = useState({});

    const [searchItem, setSearchItem] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchedResults] = useState(false);

    if (post) {
        doc.title = post.title;
        doc.content = post.content;
    }

    const handleChange = (e) => {
    const { name, value } = e.target;

    setDoc((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        }));
    };
    
    const handleDoc = async (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const file = selectedFile ? await fileService.uploadFile(selectedFile) : null;
            console.log(file);

            if (file) {
                const docs = await stuService.createDoc(doc.title, doc.content, file.$id, userId);
                console.log("Doc ADDED SUCCESSFULLY", docs);
                if (post && docs) {
                    try {
                        await reqService.deleteReq(post.$id);
                        console.log("Request fulfilled SUCCESSFULLY");
                    } catch (error) {
                        console.log("ERROR ON deleting req. after fulfilling ON FRONT-END", error);
                    }
                }
            setDoc({
                title: "",
                content: "",
            });
            }
        } catch (error) {
        console.log("ERROR ON ADDING Doc ON FRONT-END", error);
        }
    };

    const handleDelete = async (postId, docId) => {
        try {
            await stuService.deleteDoc(postId);
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

    const handlePreview = async (docId) => {
        try {
            const preview = fileService.getFilePreview(docId);
            setViewURL(preview.href);
        } catch (error) {
            console.log("ERROR ON Previewing Doc ON FRONT-END", error);
        }
    }

    const handleSearch = (e) => {
        setSearchItem(e.target.value);
    }

    const handleSearchClick = () => {
        const filterResult = finalDocs.filter((result) => result.title.toLowerCase().includes(searchItem.toLowerCase())
        )
        setSearchResults(filterResult);
        setShowSearchedResults(true);
    }

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
        <div className="lg:px-[4rem] px-5 pt-10 py-[1rem] font-poppins bg-gradient-to-br from-[#F1F9FB] to-[#D5F2F8] min-h-screen">
        {/* add doc section  */}
        
            <div className="grid grid-cols-4 gap-3 lg:gap-[3rem] h-[4rem] mb-10 justify-center items-center px-6 rounded bg-[#9BD8DB] shadow-lg">

                <div className="col-span-3">
                    <Input
                    type="text"
                    id="searchItem"
                    name="searchItem"
                    value={searchItem}
                    onChange={handleSearch}
                    placeholder="Enter Note Title to Search : "
                    required={true}
                    />
                </div>

                <div className="flex flex-col gap-2 justify-end">
                    <Button
                    className="bg-[#3C949E] hover:bg-[#024F55]"
                    onClick={handleSearchClick}
                    >
                    Search 
                    </Button>
                </div>
                </div>
            
        <Card className='shadow-lg'>
            <CardHeader>
            <CardTitle className='text-[#024F55]'>Add Notes</CardTitle>
            <CardDescription>
                Add your Notes in a single click.
            </CardDescription>
            </CardHeader>
            <form action="" method="post" onSubmit={handleSubmit}>
            <CardContent>
                <div className="grid lg:grid-cols-4 gap-5 lg:gap-[3rem]">
                <div className="">
                    <Label htmlFor="title">Note Title</Label>
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
                    <Label htmlFor="content">Note Content</Label>
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
                <div className="">
                    <Label htmlFor="featuredDoc">Featured Note</Label>
                    <Input
                    type="file"
                    id="featuredDoc"
                    name="featuredDoc"
                    className="capitalize"
                    onChange={handleDoc}
                    accept="image/png, image/jpg, application/pdf"
                    required={true}
                    />
                </div>

                <div className="flex flex-col gap-2 justify-end">
                    <Button
                    type="submit"
                    className="flex items-center gap-1 mt-3 lg:mt-0 bg-[#3C949E] hover:bg-[#024F55]"
                    >
                    Upload Note
                    </Button>
                </div>
                </div>
            </CardContent>
            </form>
        </Card>
        
        {showSearchResults ? (
            <div className="mt-10">
            <h2 className="text-xl font-semibold text-[#024F55]">Filtered Notes ({searchResults.length})</h2>

            {searchResults.length >0 ? (
                <div className="mt-10 flex gap-y-6 justify-center items-center">
                    <ul className="flex flex-col justify-center flex-wrap lg:flex-row gap-6">
                        {searchResults.map((item) => (
                        <Card className="flex items-center overflow-y-auto shadow-xl pt-6 w-80 min-h-60 max-h-[450px]" key={item.$id}>
                            <CardContent className="flex w-full items-center justify-between flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-4 w-full">
                                <div>
                                    <img src={note} alt="note-logo" width='50px' className='rounded-sm'/>
                                </div>
                                <div className="font-semibold">{item.title.toString()}</div>
                                <div className="">
                                {" "}
                                <span>{item.content.toString()}</span>
                                </div>
                                <div className="flex gap-4">
                                    <Button className='bg-[#3C949E] hover:bg-[#024F55]'
                                    onClick={() => handlePreview(item.featuredDoc)}
                                    >
                                        <a href={viewURL} target='blank'><span>View</span></a>
                                    </Button>
                                    
                                    {(item.userId === userId || userLabel === 'admin') ? <div className="flex items-center gap-8">
                                    <Button
                                    className="flex items-center gap-1 bg-[#3C949E] hover:bg-[#024F55]"
                                    onClick={() => handleDelete(item.$id, item.featuredDoc)}
                                    >
                                    <i className="fa-solid fa-trash"></i>
                                    </Button>
                                    </div> : (null)}
                                </div>
                                
                                    <Button className='bg-[#3C949E] hover:bg-[#024F55]'
                                    onClick={() => handleDownload(item.featuredDoc)}
                                    >
                                        <a href={downURL}><span>Download</span></a>
                                    </Button>
                            </div>
                            </CardContent>
                        </Card>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="mt-10 flex flex-col gap-y-6">
                No search results found for "{searchItem}", please request notes!
                </div>
            )}
        </div>
            
        ) : (null)}
        
        {/* all notes section  */}
        {loaderK ? (
            <div className="mt-10 text-center">
            <div className="loader mx-auto"></div>
            </div>
        ) : (
            <div className="mt-10">
            <h2 className="text-xl font-semibold text-[#024F55]">All Notes ({length})</h2>

            {Object.keys(finalDocs).length ? (
                <div className="mt-10 flex gap-y-6 justify-center items-center">
                    <ul className="flex flex-col justify-center flex-wrap lg:flex-row gap-6">
                        {finalDocs.map((item) => (
                        <Card className="flex items-center overflow-y-auto shadow-xl pt-6 w-80 min-h-60 max-h-[450px]" key={item.$id}>
                            <CardContent className="flex w-full items-center justify-between flex-col gap-5">
                            <div className="flex flex-col items-center justify-between gap-4 w-full">
                                <div>
                                    <img src={note} alt="note-logo" width='50px' className='rounded-sm'/>
                                </div>
                                <div className="font-semibold">{item.title.toString()}</div>
                                <div className="">
                                {" "}
                                <span>{item.content.toString()}</span>
                                </div>
                                <div className="flex gap-4">
                                    <Button className='bg-[#3C949E] hover:bg-[#024F55]'
                                    onClick={() => handlePreview(item.featuredDoc)}
                                    >
                                        <a href={viewURL} target='blank'><span>View</span></a>
                                    </Button>
                                    
                                    {(item.userId === userId || userLabel === 'admin') ? <div className="flex items-center gap-8">
                                    <Button
                                    className="flex items-center gap-1 bg-[#3C949E] hover:bg-[#024F55]"
                                    onClick={() => handleDelete(item.$id, item.featuredDoc)}
                                    >
                                    <i className="fa-solid fa-trash"></i>
                                    </Button>
                                    </div> : (null)}
                                </div>
                                
                                    <Button className='bg-[#3C949E] hover:bg-[#024F55]'
                                    onClick={() => handleDownload(item.featuredDoc)}
                                    >
                                        <a href={downURL}><span>Download</span></a>
                                    </Button>
                            </div>
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