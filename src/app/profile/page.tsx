"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [dat, setDat] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout Successful");
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');

            console.log(res.data);
            setData(res.data.data.username);


        } catch (error: any) {
            console.log(error.message);
            toast.error("Failed to fetch user details");
        }
    };



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6 border border-gray-700">
                <h1 className="text-3xl font-bold text-center text-white">Your Profile</h1>
                <h2 className="text-center text-gray-300">
                    {data === 'nothing' ? " " : (
                        <Link href={`/profile/${data}`} className="text-blue-400 hover:underline">
                            View Profile (ID: {data})
                        </Link>
                    )}
                </h2>

                <div className="border-t border-gray-700 w-full"></div>

                <div className="space-y-6">
                    <p className="text-gray-300 text-center">Manage your account details and preferences</p>

                    <div className="flex flex-col space-y-4 pt-2">
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            onClick={logout}
                        >
                            Logout
                        </button>

                        <button
                            onClick={getUserDetails}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Get User Details
                        </button>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                        <p className="text-center text-gray-400 text-sm">
                            Need help? <a href="#" className="text-blue-400 hover:text-blue-300 underline">Contact support</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}