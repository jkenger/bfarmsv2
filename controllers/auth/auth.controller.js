import asyncHandler from "express-async-handler";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";
import passport from "passport";
import { authenticator } from "otplib";
import prisma from "../../prisma/db/db.js";


export const signup = asyncHandler(async (req, res) => {
  console.log('sign up')
  return res.status(201).json({
    message: "Signup successful",
    user: req.user,
  });

});
export const login = async (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      if (!user.twofaEnabled) {
        return res.json({
          message: "Login successful",
          twofaEnabled: false,
          token: jwt.sign(
            {
              user: { email: user.email },
            },
            process.env.JWT_SECRET
          ),
        });
      } else {
        return res.json({
          message: "Please complete 2-factor authentication",
          twofaEnabled: true,
          loginStep2VerificationToken: jwt.sign(
            {
              // important to keep this payload different from a real/proper
              // authentication token payload so that this token cannot be used
              // for real/proper authentication defeating the whole point of
              // 2-factor authentication
              loginStep2Verification: { email: user.email },
            },
            process.env.JWT_SECRET,
            { expiresIn: "5m" }
          ),
        });
      }
    }
  )(req, res, next);
};
export const loginStep2 = async (req, res) => {
  let loginStep2VerificationToken = null;
  try {
    loginStep2VerificationToken = jwt.verify(
      req.body.loginStep2VerificationToken,
      process.env.JWT_SECRET
    );
  } catch (err) {
    return res.status(401).json({
      message: "You are not authorized to perform login step-2",
    });
  }

  const token = req.body.twofaToken.replaceAll(" ", "");
  const user = await prisma.account.findUnique({
    where: {
      email: loginStep2VerificationToken.loginStep2Verification.email,
    },
  });
  if (!authenticator.check(token, user.twofaSecret)) {
    return res.status(400).json({
      message: "OTP verification failed: Invalid token",
    });
  } else {
    return res.json({
      message: "OTP verification successful",
      token: jwt.sign(
        {
          user: { email: user.email },
        },
        process.env.JWT_SECRET
      ),
    });
  }
};


// Get current account
export const currentAccount = asyncHandler(async (req, res) => {
  console.log("current user", req.user)
  const account = await prisma.account.findUnique({
    where: {
      email: req.user.email,
    },
    select:{
      email: true,
      twofaEnabled: true,
    }
  });
  return res.json({
    message: "Success",
    user: account,
  });
});


export const profile = async (req, res) => {
  return res.json({
    message: "Success",
    user: req.user,
  });
};

export const generate2faSecret = async (req, res) => {
  const user = await prisma.account.findUnique({
    where: {
      email: req.user.email,
    },
  });

  if (user.twofaEnabled) {
    return res.status(400).json({
      message: "2FA already verified and enabled",
      twofaEnabled: user.twofaEnabled,
    });
  }

  const secret = authenticator.generateSecret();
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




export const disable2fa = async (req, res) => {
  const user = await prisma.account.findOneAndUpdate({
    where: {
      email: req.user.email,
    },
    data:{
      twofaEnabled: false,
      twofaSecret: "",
    }
  });

  return res.json({
    message: "2FA disabled successfully",
    twofaEnabled: user.twofaEnabled,
  });
};

