import React from "react";
import hero from "@/assets/login-illustration.jpg"
import authservice from "@/appwrite/auth";

function Auth() {
    const loginWithGoogleAuth = async () => {
        await authservice.loginWithGoogle();
    };

    return (
        <div className="w-screen px-2 md:px-6 py-4 md:py-6 md:flex">

            <img
                className="w-full md:w-1/2 p-10"
                src={hero}
                alt="main-img"
            />

        <div className="w-full md:w-1/2 md:flex justify-center flex-col md:ml-12 px-4 pb-10">
        <h1 className="lg:text-7xl text-5xl font-semibold text-center py-14 lg:py-20 lg:leading-[5.3rem] leading-[3.5rem]">
            Get your Free Account and continue using <span className="text-[#024F55]">ShareSphere.</span>
        </h1>
        <button
            onClick={loginWithGoogleAuth}
            className="bg-gradient-to-br from-[#9BD8DB] to-[#024F55] px-5 py-3 rounded-lg capitalize font-semibold text-white text-lg flex gap-3 mx-auto"
        >
            <span>Login with Google</span>
            <span>
            <i className="fa-brands fa-google"></i>
            </span>
        </button>
        </div>
        </div>
    );
}

export default Auth;