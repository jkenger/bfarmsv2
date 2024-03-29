import asyncHandler from "express-async-handler";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";
import passport from "passport";
import { authenticator } from "otplib";
import prisma from "../../prisma/db/db.js";
import { StatusCodes } from "http-status-codes";
import otplib from "otplib";

// Controller function to get current account details
export const currentAccount = asyncHandler(async (req, res) => {
  // Business Logic:
  // This function retrieves the current account details of the authenticated user
  // and returns a JSON response containing the account details.
  const account = await prisma.account.findUnique({
    where: {
      email: req.user.email,
    },
    select: {
      email: true,
      twofaEnabled: true,
    },
  });
  return res.status(StatusCodes.OK).json({
    message: "Authenticated successfully",
    account: account,
  });
});

// Controller function for user profile
export const profile = async (req, res) => {
  // Business Logic:
  // This function retrieves the profile information of the authenticated user
  // and returns a JSON response containing the profile data.
  return res.json({
    message: "Success",
    user: req.user,
  });
};

// Middleware to handle asynchronous routes
export const signup = asyncHandler(async (req, res) => {
  // Business Logic:
  // This function handles user sign-up.
  // It logs a message indicating the sign-up process.
  // Then returns a JSON response indicating successful sign-up.
  console.log("sign up");
  return res.status(201).json({
    message: "Signup successful",
    user: req.user,
  });
});

// Controller function for user login
export const login = async (req, res, next) => {
  passport.authenticate(
    "login", // Passport strategy name
    { session: false }, // Options for authentication
    async (err, user, info) => {
      if (err || !user) {
        // Business Logic:
        // If there's an error during login or user not found,
        // it returns a JSON response indicating invalid email or password.
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // If two-factor authentication is not enabled for the user
      if (!user.twofaEnabled) {
        // Business Logic:
        // If two-factor authentication is not enabled,
        // it generates a JWT token for authentication,
        // sets the token as a cookie in the response,
        // and returns current account details.
        const token = jwt.sign(
          {
            user: { email: user.email },
          },
          process.env.JWT_SECRET
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        await currentAccount(req, res);
      } else {
        // If two-factor authentication is enabled for the user
        const SECRET = "LIDWWCYBBUADCWDP";
        const devOTP = otplib.authenticator.generate(SECRET); // Generate OTP
        const devTimeRemaining = otplib.authenticator.timeRemaining(); // Get time remaining for OTP
        // Generate JWT token for second step verification
        const token = jwt.sign(
          {
            // Payload for second step verification
            loginStep2Verification: {
              email: user.email,
            },
          },
          process.env.JWT_SECRET,
          { expiresIn: "5m" } // Token expiry time
        );
        // Set token as a cookie in the response
        res.cookie("loginStep2VerificationToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "development" ? false : true,
          sameSite: "strict",
        });
        // Send response with necessary data for completing second step verification
        return res.json({
          user: user?.email,
          message: "Please complete 2-factor authentication",
          twofaEnabled: true,
          devOTP: devOTP,
          devTimeRemaining,
        });
      }
    }
  )(req, res, next);
};

// Controller function for user logout
export const logout = async (req, res) => {
  // Business Logic:
  // This function handles user logout.
  // It clears the authentication token cookie and returns a JSON response indicating successful logout.
  res.clearCookie("token");
  return res.status(StatusCodes.OK).json({
    message: "Logout successful",
  });
};

// Controller function for second step of login (for two-factor authentication)
export const loginStep2 = async (req, res) => {
  let loginStep2VerificationToken = null;
  let step2Token = req.cookies.loginStep2VerificationToken;
  try {
    // Verify the JWT token for second step verification
    loginStep2VerificationToken = jwt.verify(
      step2Token,
      process.env.JWT_SECRET
    );
  } catch (err) {
    // Handle unauthorized access
    return res.status(401).json({
      message: "You are not authorized to perform login step-2",
      err: err,
    });
  }

  // Extract OTP token from request body
  const token = req.body.twofaToken.replaceAll(" ", "");
  // Find user based on email from the second step verification token
  const user = await prisma.account.findUnique({
    where: {
      email: loginStep2VerificationToken.loginStep2Verification.email,
    },
  });

  // Generate JWT token for final authentication
  const jwtToken = jwt.sign(
    {
      user: { email: user.email },
    },
    process.env.JWT_SECRET
  );

  // Check if provided OTP token is valid
  if (!authenticator.check(token, user.twofaSecret)) {
    // Business Logic:
    // If OTP verification fails, return a JSON response indicating failure.
    return res.status(400).json({
      message: "OTP verification failed: Invalid token",
    });
  } else {
    // If OTP verification is successful, set authentication token cookie
    res.cookie("token", jwtToken);
    return res.json({
      message: "OTP verification successful",
      user: user,
    });
  }
};

// Controller function to generate two-factor authentication secret
export const generate2faSecret = async (req, res) => {
  // Business Logic:
  // This function generates a two-factor authentication secret for the authenticated user,
  // updates the user's data with the generated secret, and returns a JSON response
  // containing the secret and a QR code image for setup.
  const user = await prisma.account.findUnique({
    where: {
      email: req.user.email,
    },
  });

  // Check if two-factor authentication is already enabled
  if (user.twofaEnabled) {
    return res.status(400).json({
      message: "2FA already verified and enabled",
      twofaEnabled: user.twofaEnabled,
    });
  }

  // Generate two-factor authentication secret
  const secret = authenticator.generateSecret();
  // Update user data with the generated secret
  await prisma.account.update({
    where: {
      email: req.user.email,
    },
    data: {
      twofaSecret: secret,
    },
  });
  const appName = "Express 2FA";

  return res.json({
    message: "2FA secret generation successful",
    secret: secret,
    qrImageDataUrl: await qrcode.toDataURL(
      authenticator.keyuri(req.user.email, appName, secret)
    ),
    twofaEnabled: user.twofaEnabled,
  });
};

// Controller function to verify OTP for enabling two-factor authentication
export const verifyOtp = async (req, res) => {
  const user = await prisma.account.findUnique({
    where: {
      email: req.user.email,
    },
  });
  if (user.twofaEnabled) {
    return res.json({
      message: "2FA already verified and enabled",
      twofaEnabled: user.twofaEnabled,
    });
  }

  const token = req.body.token.replaceAll(" ", "");
  if (!authenticator.check(token, user.twofaSecret)) {
    return res.status(400).json({
      message: "OTP verification failed: Invalid token",
      twofaEnabled: user.twofaEnabled,
    });
  } else {
    // Business Logic:
    // If OTP verification is successful, enable two-factor authentication for the user
    // by updating the user's data, and return a JSON response indicating success.
    await prisma.account.update({
      where: {
        email: req.user.email,
      },
      data: {
        twofaEnabled: true,
      },
    });

    return res.json({
      message: "OTP verification successful",
      twofaEnabled: user.twofaEnabled,
    });
  }
};

// Controller function to disable two-factor authentication
export const disable2fa = async (req, res) => {
  const user = await prisma.account.findOneAndUpdate({
    where: {
      email: req.user.email,
    },
    data: {
      twofaEnabled: false,
      twofaSecret: "",
    },
  });

  // Business Logic:
  // This function disables two-factor authentication for the authenticated user
  // by updating the user's data, and returns a JSON response indicating success.
  return res.json({
    message: "2FA disabled successfully",
    twofaEnabled: user.twofaEnabled,
  });
};
