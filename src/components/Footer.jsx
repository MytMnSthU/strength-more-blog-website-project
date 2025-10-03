import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaHeart } from "react-icons/fa";
import CategoryLabelList from "./CategoryLabelList";




const Footer = () => {
    return (
        <footer className=" border-t border-black dark:border-[#aaa]">
            <div className=" container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 my-5 p-2.5 sm:my-10">
                <div className="  sm:row-span-2">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <p className=" text-sm">
                        <span className="title">STRENGTH MORE</span> is a blog website that provides articles on various topics including
						technology, health, lifestyle, and more. Our mission is to share knowledge and insights to help
						our readers lead better lives.
                    </p>
                </div>

                <div>
                    <span className=" uppercase text-base font-semibold">
                        categories
                    </span>

                    <hr className=" border-b border-b-black dark:border-b-[#aaa] my-2" />

                    <CategoryLabelList />
                </div>
            </div>
            <div className="sm:col-span-2 border-t border-t-black dark:border-t-[#aaa] mb-5 sm:mb-0">
                <span className=" flex justify-center items-center gap-1 text-sm py-3">
                    Made with <FaHeart />
                    by<a href="https://github.com/MytMnSthU">Myat</a>
                </span>
            </div>
        </footer>
    );
};

export default Footer