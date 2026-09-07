import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { useState } from "react";

const Login = () => {

    const [signInForm, setSignInForm] = useState(true)

    const toggleSignInForm = () => {
        setSignInForm(!signInForm)
    }

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
                        type="text"
                        placeholder="Full Name"
                        className="mb-4 w-full rounded bg-[#333] px-4 py-3.5 text-sm text-white placeholder-gray-400 outline-none focus:bg-[#454545] focus:ring-2 focus:ring-gray-400"
                    />}

                    <input
                        type="text"
                        placeholder="Email or mobile number"
                        className="mb-4 w-full rounded bg-[#333] px-4 py-3.5 text-sm text-white placeholder-gray-400 outline-none focus:bg-[#454545] focus:ring-2 focus:ring-gray-400"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="mb-6 w-full rounded bg-[#333] px-4 py-3.5 text-sm text-white placeholder-gray-400 outline-none focus:bg-[#454545] focus:ring-2 focus:ring-gray-400"
                    />

                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded bg-[#e50914] py-3 text-base font-semibold text-white transition duration-200 hover:bg-[#c11119]"
                    >
                        {signInForm ? "Sign In" : "Sign Up"}
                    </button>

                    {signInForm && <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                defaultChecked
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