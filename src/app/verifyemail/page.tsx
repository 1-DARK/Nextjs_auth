"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false);

    const VerifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            VerifyUserEmail();
        }
    }, [token]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 py-8">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 text-center border border-gray-700">
                <h1 className="text-3xl font-bold text-white">Email Verification</h1>

                {/* Token Display */}
                <div className={`p-4 rounded-lg transition-all duration-300 ${token ? 'bg-gray-700 text-blue-400' : 'bg-gray-700 text-gray-400'}`}>
                    <p className="font-mono text-sm break-all">
                        {token ? `Token: ${token}` : "No token provided"}
                    </p>
                </div>

                {/* Success State */}
                {verified && (
                    <div className="animate-fade-in">
                        <div className="p-4 mb-4 bg-green-900/30 border border-green-700 text-green-400 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <h2 className="text-xl font-semibold">Email Verified Successfully!</h2>
                        </div>
                        <Link href="/login" className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                            Proceed to Login
                        </Link>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="animate-fade-in">
                        <div className="p-4 mb-4 bg-red-900/30 border border-red-700 text-red-400 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-xl font-semibold">Verification Error</h2>
                        </div>
                        <p className="text-gray-300 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {!verified && !error && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-400">Verifying your email...</p>
                    </div>
                )}
            </div>
        </div>
    )
}