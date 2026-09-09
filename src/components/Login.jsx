import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { useState, useRef } from "react";
import checkValidData from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_IMG } from "../utils/constants";

const Login = () => {

    const [signInForm, setSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setSignInForm(!signInForm)
    }

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const getFirebaseAuthErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/invalid-credential":
                return "Incorrect email or password. Please try again.";
            case "auth/user-not-found":
                return "Sorry, we can't find an account with this email address. Please try again or create a new account.";
            case "auth/wrong-password":
                return "Incorrect password. Please try again.";
            case "auth/email-already-in-use":
                return "This email is already registered. Please sign in instead.";
            case "auth/invalid-email":
                return "Please enter a valid email address.";
            case "auth/weak-password":
                return "Password is too weak. Please choose a stronger password.";
            case "auth/too-many-requests":
                return "Too many failed attempts. Please try again later.";
            case "auth/network-request-failed":
                return "Network error. Please check your internet connection.";
            default:
                return "Authentication failed. Please try again.";
        }
    };

    const handleButtonClick = () => {
        const nameVal = !signInForm ? name.current?.value : null;
        const emailVal = email.current?.value;
        const passwordVal = password.current?.value;

        const message = checkValidData(emailVal, passwordVal, nameVal);
        setErrorMessage(message);

        if (message) return;

        if (!signInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(auth, emailVal, passwordVal)
                .then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: nameVal,
                        photoURL: USER_IMG
                    }).then(() => {
                        const { uid, displayName, email, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, displayName: displayName, email: email, photoURL: photoURL }));
                        navigate("/browse");
                    }).catch((error) => {
                        setErrorMessage(getFirebaseAuthErrorMessage(error.code));
                    });
                })
                .catch((error) => {
                    setErrorMessage(getFirebaseAuthErrorMessage(error.code));
                });
        } else {
            // Sign In Logic
            signInWithEmailAndPassword(auth, emailVal, passwordVal)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("Signed in user:", user);
                    navigate("/browse")
                })
                .catch((error) => {
                    setErrorMessage(getFirebaseAuthErrorMessage(error.code));
                });
        }
    };


    return (
        <div className="relative min-h-screen w-full bg-black">
            <Header />

            <div className="absolute inset-0">
                <img
                    className="h-full w-full object-cover"
                    src={BG_URL}
                    alt="Netflix Background"
                />
                <div className="absolute inset-0 bg-black/60 bg-linear-to-t from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full max-w-105 rounded-md bg-black/40 p-8 sm:p-14 text-white shadow-2xl backdrop-blur-xs"
                >
                    <h1 className="mb-7 text-3xl font-bold">
                        {signInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {!signInForm && <input
                        type="text" ref={name}
                        placeholder="Full Name"
                        className="mb-4 w-full rounded bg-[#333] px-4 py-3.5 text-sm text-white placeholder-gray-400 outline-none focus:bg-[#454545] focus:ring-2 focus:ring-gray-400"
                    />}

                    <input
                        type="text" ref={email}
                        placeholder="Email or mobile number"
                        className="mb-4 w-full rounded bg-[#333] px-4 py-3.5 text-sm text-white placeholder-gray-400 outline-none focus:bg-[#454545] focus:ring-2 focus:ring-gray-400"
                    />

                    <input
                        type="password" ref={password}
                        placeholder="Password"
                        className="mb-4 w-full rounded bg-[#333] px-4 py-3.5 text-sm text-white placeholder-gray-400 outline-none focus:bg-[#454545] focus:ring-2 focus:ring-gray-400"
                    />

                    <p className="text-red-500 font-semibold mb-4">{errorMessage}</p>
                    <button
                        type="submit" onClick={() => { handleButtonClick() }}
                        className="w-full cursor-pointer rounded bg-[#e50914] py-3 text-base font-semibold text-white transition duration-200 hover:bg-[#c11119]"
                    >
                        {signInForm ? "Sign In" : "Sign Up"}
                    </button>

                    {signInForm && <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded accent-[#e50914] bg-gray-700"
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="hover:underline">
                            Need help?
                        </a>
                    </div>}

                    <div className="mt-10 text-sm text-gray-400">
                        <span className="mr-2">
                            {signInForm ? "New to Netflix?" : "Already have an account?"}
                        </span>
                        <button onClick={() => toggleSignInForm()}
                            type="button"
                            className="cursor-pointer font-medium text-white hover:underline"
                        >
                            {signInForm ? "Sign up now" : "Sign In"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;