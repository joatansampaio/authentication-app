import { testRoute, getUserById } from "./testRoute.js";
import { signUpRoute } from "./signUpRoute.js";
import { logInRoute } from "./logInRoute.js";
import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { testEmailRoute } from "./testEmailRoute.js";
import { verifyEmailRoute } from "./verifyEmailRoute.js";
import { forgotPasswordRoute } from "./forgotPasswordRoute.js";
import { resetPasswordRoute } from "./resetPasswordRoute.js";
import { googleOauthCallbackRoute } from "./googleOAuthCallbackRoute.js";
import { getGoogleOauthUrlRoute } from "./getGoogleOAuthUrlRoute.js";

export const routes = [
    testRoute,
    getUserById,
    signUpRoute,
    logInRoute,
    updateUserInfoRoute,
    testEmailRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    googleOauthCallbackRoute,
    getGoogleOauthUrlRoute,
];