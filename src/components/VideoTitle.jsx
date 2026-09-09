const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-full aspect-video pt-[14%] sm:pt-[12%] md:pt-[10%] lg:pt-[8%] px-6 md:px-12 lg:px-16 absolute text-white bg-linear-to-r from-black/90 via-black/40 to-transparent z-10 flex flex-col justify-center select-none">
            {/* Movie Title */}
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl drop-shadow-xl tracking-tight leading-tight">
                {title}
            </h1>

            {/* Movie Overview */}
            <p className="hidden md:inline-block py-3 md:py-4 lg:py-6 text-xs sm:text-sm md:text-base text-gray-200 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl line-clamp-3 drop-shadow">
                {overview}
            </p>

            {/* Action Buttons */}
            <div className="mt-3 md:mt-2 flex items-center gap-2 sm:gap-3">
                <button className="flex items-center gap-2 bg-white text-black font-bold px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-sm hover:bg-white/80 transition duration-200 text-xs sm:text-sm md:text-base cursor-pointer shadow-md">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Play</span>
                </button>

                <button className="flex items-center gap-2 bg-zinc-600/70 text-white font-semibold px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-sm hover:bg-zinc-600/50 transition duration-200 text-xs sm:text-sm md:text-base cursor-pointer backdrop-blur-xs shadow-md">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" d="M12 16v-4m0-4h.01" />
                    </svg>
                    <span>More Info</span>
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;