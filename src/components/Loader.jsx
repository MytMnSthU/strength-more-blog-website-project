import { PuffLoader } from "react-spinners";

const Loader = () => {
	
    return (
        <div className=" w-full h-screen bg-[#F3F1E8] dark:bg-[#1F1F1F] grid place-items-center">
            <PuffLoader color="" />
        </div>
    );
};

export default Loader;
