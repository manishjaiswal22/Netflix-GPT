import { LOGO } from "../utils/constants";

const Header = () => {
    return (
        <div className="absolute top-0 left-0 w-full px-6 md:px-12 py-4 bg-linear-to-b from-black/80 to-transparent z-20 flex items-center justify-between">
            <img 
                className="w-36 md:w-44 drop-shadow-md cursor-pointer" 
                src={LOGO} 
                alt="Netflix Logo" 
            />
        </div>
    )
}

export default Header;