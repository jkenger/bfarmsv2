// Import necessary modules
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; // Importing JWT strategy and token extractor
import LocalStrategy from "passport-local"; // Importing local strategy
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import prisma from "../prisma/db/db.js"; // Importing Prisma for database operations
import passport from "passport"; // Importing Passport for authentication

// Local login strategy
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email", // Field name for email
      passwordField: "password", // Field name for password
      passReqToCallback: true, // Allowing passing request to callback
    },
    async (req, email, password, done) => {
      try {
        // Finding user by email
        const user = await prisma.account.findUnique({
          where: {
            email,
          },
        });

        // If user not found, return error
        if (!user) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }

        // Verifying password
        const validate = await prisma.account.verifyPassword(email, password);

        // If password is invalid, return error
        if (!validate) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }

        // If login successful, return user
        return done(null, user, {
          message: "Logged in successfully",
        });
      } catch (error) {
        // If error occurs, return error
        return done(error);
      }
    }
  )
);

// JWT strategy for authentication
passport.use(
  "jwt",
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET, // JWT secret key
      jwtFromRequest: (req) => req.cookies.token, // Extract JWT token from Authorization header
    },
    async (token, done) => {
      try {
        console.log("token", token);
        // Finding user by email from JWT token
        const user = await prisma.account.findUnique({
          where: {
            email: token.user?.email,
          },
        });

        // Return user details if found
        return done(null, {
          email: user.email,
          twofaEnabled: user.twofaEnabled,
        });
      } catch (error) {
        // If error occurs, return error
        return done(error);
      }
    }
  )
);

// Local signup strategy
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email", // Field name for email
      passwordField: "password", // Field name for password
      passReqToCallback: true, // Allowing passing request to callback
    },
    async (req, email, password, done) => {
      try {
        // Checking if account already exists with given email
        const accountExist = await prisma.account.findUnique({
          where: {
            email,
          },
        });

        // If account exists, return error
        if (accountExist) {
          return done(null, false, {
            message: `User with email ${email} already exists`,
          });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new account
        const user = await prisma.account.create({
          data: {
            email,
            password: hashedPassword,
          },
        });

        // Logging user creation
        console.log("account created", user);

        // Return created user
        return done(null, {
          email: user.email,
        });
      } catch (error) {
        // If error occurs, return error
        return done(error);
      }
    }
  )
);

// Exporting Passport instance
export default passport;
