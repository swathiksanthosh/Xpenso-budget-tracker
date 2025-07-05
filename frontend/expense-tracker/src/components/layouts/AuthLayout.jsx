import React from 'react';
import LOGO from "../../assets/images/xpenso.png";
import RIGHT_IMAGE from "../../assets/images/rightxp.png";

const AuthLayout = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-row bg-neutral-200">
            {/* Left Panel */}
            <div className="relative w-full md:w-[60vw] px-10 md:px-16 pt-8 pb-12 flex flex-col">
                <div className="absolute top-6 left-6">
                    <img
                        src={LOGO}
                        alt="Xpenso Logo"
                        className="w-[60px] h-[60px] object-contain bg-transparent"
                    />
                    {/* <h2 className="-mt-1 text-[11px] font-bold text-gray-900">Xpenso</h2> */}
                </div>

                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-md">{children}</div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="hidden md:flex flex-1 items-center justify-center p-8 bg-gray-150">
                <div className="bg-white rounded-[20px] shadow-[3px_3px_2px_rgba(150,40,300,0.70)] p-8">
                    {/* <h1 className="text-4xl font-extrabold text-black">Xpenso.</h1> */}
                    {/* <p className="text-sm text-primary font-semibold mt-2 uppercase tracking-wide">
                        Your All In One Budget Tracker
                    </p> */}
                    <img
                        src={RIGHT_IMAGE}
                        alt="Finance Illustration"
                        className="w-[600px] h-[640px] object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

