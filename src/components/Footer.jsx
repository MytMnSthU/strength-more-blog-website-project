import { FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className=" ">
            <div className="sm:col-span-2 mb-5 sm:mb-0 border-t border-black/20 dark:border-white/20">
                <span className=" flex justify-center items-center gap-1 text-sm py-3">
                    Made with <FaHeart />
                    by<a href="https://github.com/MytMnSthU">Myat</a>
                </span>
            </div>
        </footer>
    );
};

export default Footer