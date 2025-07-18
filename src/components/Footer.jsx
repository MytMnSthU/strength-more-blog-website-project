import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaHeart } from "react-icons/fa";
import CategoryLabelList from "./CategoryLabelList";




const Footer = () => {
    return (
        <footer className=" border-t border-black">
            <div className=" container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 my-5 p-2.5 sm:my-10">
                <div className="  sm:row-span-2">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Placeat in laboriosam, voluptatem eaque neque
                        deserunt voluptates expedita debitis rerum modi quos
                        corporis architecto repellendus, dolorum id similique a
                        nam alias!
                    </p>
                </div>

                <div>
                    <span className=" uppercase text-base font-semibold">
                        categories
                    </span>

                    <hr className=" border-b border-b-black my-2" />

                    <CategoryLabelList />
                </div>

                <div>
                    <span className=" uppercase text-base font-semibold">
                        social links
                    </span>

                    <hr className=" border-b border-b-black my-2" />

                    <a href="#" className=" text-base  font-bold uppercase">
                        facebook
                    </a>

                    <hr className=" border-b border-b-black my-2" />
                    <a href="#" className=" text-base  font-bold uppercase">
                        instagram
                    </a>

                    <hr className=" border-b border-b-black my-2" />
                    <a href="#" className=" text-base  font-bold uppercase">
                        twitter
                    </a>

                    {/* <hr className=" border-b border-b-black my-2" /> */}
                </div>
            </div>
            <div className="sm:col-span-2 border-t border-t-black mb-5 sm:mb-0">
                <span className=" flex justify-center items-center gap-1 text-sm py-3">
                    Made with <FaHeart />
                    by<a href="https://github.com/MytMnSthU">Myat</a>
                </span>
            </div>
        </footer>
    );
};

export default Footer