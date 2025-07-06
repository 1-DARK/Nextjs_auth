"use client";

import React from "react";


export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    // Properly unwrap the params Promise
    const { id } = React.use(params);

    // Mock user data
    const userData = {
        avatarEmoji: "👤"
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6 border border-gray-700">
                <div className="flex flex-col items-center space-y-4">
                    {/* Emoji Avatar with Animation */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-300 flex items-center justify-center text-4xl hover:scale-105 transition-transform duration-300">
                        {userData.avatarEmoji}
                    </div>

                    {/* User Info */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-white">User Profile</h1>
                        <p className="text-xl text-gray-300 font-medium">{id || "Guest User"}</p>
                    </div>

                    {/* User Badge */}

                </div>
            </div>
        </div>
    );
}