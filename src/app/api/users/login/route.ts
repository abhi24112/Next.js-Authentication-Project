import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User doesn't Exists",
          success: false
         }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Password is incorrect",
          success: false
         }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    if (!user.isVerified) {
      const response = NextResponse.json({
        message: "Email is not Verified, Check Your Email for Verification.",
        success: false,
      });
      
      response.cookies.set("token", token, { httpOnly: true });

      return response;
    }

    // storing it to the user cookies
    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
