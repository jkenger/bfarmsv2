import express from "express";
import passport from "passport";
import {
  currentAccount,
  disable2fa,
  generate2faSecret,
  login,
  loginStep2,
  logout,
  profile,
  signup,
  verifyOtp,
} from "../controllers/auth/auth.controller.js";

const router = express.Router();

// Route for user signup
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }), // Authenticate using the "signup" strategy
  signup // Call signup controller function
);

// Route for user login
router.post(
  "/login",
  passport.authenticate("login", { session: false }), // Authenticate using the "login" strategy
  login // Call login controller function
);

// Route for user logout
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }), // Authenticate using the "jwt" strategy
  logout
);

// Route for user second step login (if applicable)
router.post("/login-step2", loginStep2);

// Route for fetching user profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }), // Authenticate using the "jwt" strategy (JSON Web Token)
  profile // Call profile controller function
);

// Route for fetching current account details
router.get(
  "/current-account",
  passport.authenticate("jwt", { session: false }), // Authenticate using the "jwt" strategy
  currentAccount // Call currentAccount controller function
);

// Route for generating 2FA (Two-Factor Authentication) secret
router.post(
  "/generate-2fa-secret",
  passport.authenticate("jwt", { session: false }), // Authenticate using the "jwt" strategy
  generate2faSecret // Call generate2faSecret controller function
);

// Route for verifying OTP (One-Time Password) for 2FA
router.post(
  "/verify-otp",
  passport.authenticate("jwt", { session: false }), // Authenticate using the "jwt" strategy
  verifyOtp // Call verifyOtp controller function
);

// Route for disabling 2FA
router.post(
  "/disable-2fa",
  passport.authenticate("jwt", { session: false }), // Authenticate using the "jwt" strategy
  disable2fa // Call disable2fa controller function
);

export default router;
