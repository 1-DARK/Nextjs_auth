import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

// For logout we remove the cookies

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
        response.cookies.set('token', "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}