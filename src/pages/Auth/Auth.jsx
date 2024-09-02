import React from "react";
import authservice from "@/appwrite/auth";

function Auths() {
    const loginWithGoogleAuth = async () => {
        await authservice.loginWithGoogle();
    };

    return (
        <div className="lg:px-[4rem] px-5 pt-10 py-[1rem] flex flex-col justify-center font-poppins">
        <h1 className="lg:text-7xl text-5xl font-semibold text-center pt-24 pb-20 lg:leading-[5.3rem] leading-[3.5rem]">
            Get your Free Account...
        </h1>
        <button
            onClick={loginWithGoogleAuth}
            className="bg-red-500 px-5 py-3 rounded-lg capitalize text-lg flex gap-3 hover:bg-red-700 mx-auto lg:w-[20%]"
        >
            <span>Login with Google</span>
            <span>
            <i className="fa-brands fa-google"></i>
            </span>
        </button>
        </div>
    );
}

export default Auths;