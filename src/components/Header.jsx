import { LOGO } from "../utils/constants";
import { useState, useRef, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Subscribe to the Redux store to check if the user is logged in
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth).catch((error) => {
            console.error("Sign out error:", error);
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email, photoURL } = user;
                dispatch(addUser({ uid, displayName, email, photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        // Unsubscribe when component unmounts
        return () => unsubscribe();
    }, [dispatch, navigate]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-12 py-3 bg-linear-to-b from-black/90 via-black/50 to-transparent text-white select-none">
            {/* Left: Netflix Logo & Navigation Links (only if logged in) */}
            <div className="flex items-center gap-7">
                <img
                    className="w-24 md:w-36 cursor-pointer object-contain"
                    src={LOGO}
                    alt="Netflix Logo"
                />

                {user && (
                    <nav className="hidden lg:flex items-center gap-5 text-[13px] tracking-normal font-normal">
                        <button className="px-3.5 py-1.5 rounded-full bg-[#2a2a2a] text-white font-medium cursor-pointer transition hover:bg-[#383838]">
                            Home
                        </button>
                        <button className="text-[#e5e5e5] hover:text-[#b3b3b3] cursor-pointer transition">
                            Shows
                        </button>
                        <button className="text-[#e5e5e5] hover:text-[#b3b3b3] cursor-pointer transition">
                            Movies
                        </button>
                        <button className="text-[#e5e5e5] hover:text-[#b3b3b3] cursor-pointer transition">
                            Games
                        </button>
                        <button className="text-[#e5e5e5] hover:text-[#b3b3b3] cursor-pointer transition">
                            New & Popular
                        </button>
                        <button className="text-[#e5e5e5] hover:text-[#b3b3b3] cursor-pointer transition">
                            My List
                        </button>
                        <button className="flex items-center gap-1 text-[#e5e5e5] hover:text-[#b3b3b3] cursor-pointer transition">
                            <span>More</span>
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z" />
                            </svg>
                        </button>
                    </nav>
                )}
            </div>

            {/* Right: Search, Notifications, Children, Profile (only if logged in) */}
            {user && (
                <div className="flex items-center gap-5 text-white">
                    {/* Search Bar */}
                    <div className="relative flex items-center">
                        {isSearchOpen ? (
                            <div className="flex items-center bg-black/85 border border-white/80 px-2.5 py-1 transition-all duration-300 w-52 sm:w-64">
                                <svg
                                    className="w-4 h-4 text-white shrink-0 cursor-pointer"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    onClick={() => setIsSearchOpen(false)}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                                    />
                                </svg>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Titles, people, genres"
                                    className="bg-transparent text-xs text-white placeholder-[#8c8c8c] outline-none w-full ml-2"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="text-gray-400 hover:text-white text-xs cursor-pointer px-1"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="cursor-pointer text-white hover:text-gray-300 transition p-1"
                                title="Search"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Notifications Bell */}
                    <button
                        className="relative cursor-pointer text-white hover:text-gray-300 transition p-1"
                        title="Notifications"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e50914] text-[10px] font-bold text-white">
                            2
                        </span>
                    </button>

                    {/* Kids / Children Button */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 text-[9px] font-black uppercase tracking-tight text-white shadow">
                            kids
                        </div>
                        <span className="hidden sm:inline text-[13px] text-[#e5e5e5] group-hover:text-white transition">
                            Children
                        </span>
                    </div>

                    {/* User Profile Avatar with Exact Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsProfileMenuOpen(true)}
                        onMouseLeave={() => setIsProfileMenuOpen(false)}
                    >
                        <div className="flex items-center gap-1.5 cursor-pointer py-1">
                            <img
                                className="h-8 w-8 rounded-sm object-cover"
                                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                                alt="Netflix User Avatar"
                            />
                            <svg
                                className={`w-3 h-3 text-white transition-transform duration-200 ${
                                    isProfileMenuOpen ? "rotate-180" : ""
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7 10l5 5 5-5z" />
                            </svg>
                        </div>

                        {/* Netflix Dropdown Menu */}
                        {isProfileMenuOpen && (
                            <div className="absolute right-0 top-full pt-2 z-50">
                                <div className="relative w-56 bg-[#191919] border border-zinc-800 rounded-md text-white shadow-2xl py-3 px-3.5 text-[13px]">
                                    {/* Up Arrow Caret */}
                                    <div className="absolute -top-1.5 right-4 w-0 h-0 border-x-6 border-x-transparent border-b-6 border-b-[#191919]" />

                                    {/* Profiles List */}
                                    <div className="space-y-3 pb-3 border-b border-zinc-700/60">
                                        <div className="flex items-center gap-3 cursor-pointer group">
                                            <div className="h-8 w-8 rounded-sm  flex items-center justify-center overflow-hidden">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={user?.photoURL || "NA"}
                                                    alt="NA"
                                                />
                                            </div>
                                            <span className="text-white group-hover:underline">
                                                {user?.displayName || "NA"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 cursor-pointer group">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 text-[10px] font-black uppercase text-white shadow">
                                                kids
                                            </div>
                                            <span className="text-white group-hover:underline">
                                                Children
                                            </span>
                                        </div>
                                    </div>

                                    {/* Menu Items with Exact Icons */}
                                    <div className="py-2.5 space-y-3 border-b border-zinc-700/60 text-white">
                                        {/* Manage Profiles */}
                                        <div className="flex items-center gap-3 cursor-pointer group">
                                            <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                            <span className="group-hover:underline">Manage Profiles</span>
                                        </div>

                                        {/* Transfer Profile */}
                                        <div className="flex items-center gap-3 cursor-pointer group">
                                            <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                            </svg>
                                            <span className="group-hover:underline">Transfer Profile</span>
                                        </div>

                                        {/* Account */}
                                        <div className="flex items-center gap-3 cursor-pointer group">
                                            <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                            <span className="group-hover:underline">Account</span>
                                        </div>

                                        {/* Help Centre */}
                                        <div className="flex items-center gap-3 cursor-pointer group">
                                            <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="group-hover:underline">Help Centre</span>
                                        </div>
                                    </div>

                                    {/* Sign Out */}
                                    <div className="pt-3 pb-1 text-center">
                                        <button
                                            onClick={handleSignOut}
                                            className="cursor-pointer text-white hover:underline text-[13px] font-normal"
                                        >
                                            Sign out of Netflix
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;