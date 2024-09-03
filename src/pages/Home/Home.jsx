import hero from '../../assets/hero-img.svg'
import Card from '@/components/ui/Card';

import React, { useEffect, useState, useCallback } from "react";
import authservice from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { ID } from 'appwrite';


function Home() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [loaderK, setLoaderK] = useState(false);


    const fetchData = useCallback(async () => {
        try {
        setLoaderK(true);
        const userData = await authservice.getCurrentAccount();
            if (userData)
            {
            dispatch(login(userData));
            setUserId(userData.$id);
            console.log("USER LOGGED IN SUCCESSFULLY");
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
                <h1 className="text-black md:text-8xl font-semibold mb-10 text-6xl">
                    <span className="text-[#fd366e]">Welcome</span> to ShareSphere community...
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
            College <span className="text-[#fd366e]">Resources</span> are now on your
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
                <button
                className="text-[#fd366e] font-semibold bg-white w-80 py-[6px] px-4 rounded border-2 border-[#fd366e]"
                >
                Get Notes
                </button>
                <button
                className="text-white font-semibold bg-[#fd366e] w-80 py-[6px] px-4 rounded border-2 border-[#fd366e] animate-pulse -z-10"
                >
                Make a Request
                </button>
            </div>
            </div>
            <div className="md:w-1/2 md:h-full ml-20 pb-12">
            <p
                className="text-black md:text-4xl mb-10 md:mb-[78px] text-3xl max-w-[70%]"
            >
                Now you can help others and get rewarded every week.
            </p>

            <div className="flex flex-col gap-4">
                <button
                className="text-[#fd366e] font-semibold bg-white w-80 py-[6px] px-4 rounded border-2 border-[#fd366e]"
                >
                Upload MyDocs
                </button>
                <button
                className="text-white font-semibold bg-[#fd366e] w-80 py-[6px] px-4 rounded border-2 border-[#fd366e] animate-pulse -z-10"
                >
                Fulfill Requests
                </button>
            </div>
            </div>
        </div>
        </div>
            

    <div className="w-screen px-10 md:px-20 py-4 md:py-10">
        <h1 className="font-bold mb-7 md:mb-20 text-4xl md:text-5xl">
            Get frequent access of <span className="text-[#fd366e]">Notes.</span>
        </h1>

        <div className="vision px-8">
            <div
            className="cards flex flex-wrap justify-between flex-col md:flex-row gap-10 md:gap-14"
            >
                <div key={ID.unique()}>
                    <Card />      
                </div>
                <div key={ID.unique()}>
                    <Card />      
                </div>
                <div key={ID.unique()}>
                    <Card />      
                </div>
                <div key={ID.unique()}>
                    <Card />      
                </div>
                <div key={ID.unique()}>
                    <Card />      
                </div>
                <div key={ID.unique()}>
                    <Card />      
                </div>
            </div>
        </div>
    </div>

    </>
    );
}

export default Home;