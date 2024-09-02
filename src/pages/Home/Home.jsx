import hero from '../../assets/hero-img.svg'

import React, { useEffect, useState, useCallback } from "react";
import authservice from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { Link, useNavigate } from "react-router-dom";


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
        <div class="w-screen h-[90vh] px-2 md:px-6 py-4 md:py-6 bg-white md:flex">
            <div class="w-full md:w-1/2 md:flex justify-center flex-col md:ml-12 px-4">
                <h1 class="text-black md:text-8xl font-semibold mb-10 text-6xl">
                    <span class="text-[#fd366e]">Welcome</span> to ShareSphere community...
                </h1>
                <p class="text-gray-600 font-semibold md:text-lg">
                    A platform where students can interact,
                </p>
                <p class="text-gray-600 font-semibold md:text-lg">
                    share &amp; gain.
                </p>
                </div>

                <img
                class="w-full md:w-1/2"
                src={hero}
                alt="main-img"
            />
            </div>
        <div class="w-screen md:h-[75vh] px-2 md:px-6 py-4 md:py-6">
        <div class="w-full h-[35%] text-center">
            <h1
            class="text-black md:text-7xl font-semibold mb-10 text-5xl max-w-[80%]"
            >
            College <span class="text-[#fd366e]">Resources</span> are now on your
            Fingertips...
            </h1>
        </div>

        <div class="w-full h-[65%] md:flex">
            <div class="md:w-1/2 md:h-full ml-20 pb-12">
            <p class="text-black md:text-4xl mb-10 text-3xl max-w-[70%]">
                Interact with your batchmates through this platform and get required
                Resources.
            </p>

            <div class="flex flex-col gap-4">
                <button
                class="text-[#fd366e] font-semibold bg-white w-80 py-[6px] px-4 rounded border-2 border-[#fd366e]"
                >
                Get Notes
                </button>
                <button
                class="text-white font-semibold bg-[#fd366e] w-80 py-[6px] px-4 rounded border-2 border-[#fd366e] animate-pulse"
                >
                Make a Request
                </button>
            </div>
            </div>
            <div class="md:w-1/2 md:h-full ml-20 pb-12">
            <p
                class="text-black md:text-4xl mb-10 md:mb-[78px] text-3xl max-w-[70%]"
            >
                Now you can help others and get rewarded every week.
            </p>

            <div class="flex flex-col gap-4">
                <button
                class="text-[#fd366e] font-semibold bg-white w-80 py-[6px] px-4 rounded border-2 border-[#fd366e]"
                >
                Upload MyDocs
                </button>
                <button
                class="text-white font-semibold bg-[#fd366e] w-80 py-[6px] px-4 rounded border-2 border-[#fd366e] animate-pulse"
                >
                Fulfill Requests
                </button>
            </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default Home;