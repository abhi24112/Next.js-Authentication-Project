import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest){
    try {
        await connect();
        const reqBody = await request.json()
        const {email} = reqBody

        const user = await User.findOne({email})

        // verifing the user existence
        if(!user){
            return NextResponse.json({
                message: "Please Enter Correct Email",
                success:false
            })
        }

        // sending mail to the user for reseting of password
        await sendEmail({email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            message: "Check your mail to reset the password",
            success:true
        })


    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            message: "Please Enter Correct Email / Try Some Another Time"
        }, {status: 400})
    }
}