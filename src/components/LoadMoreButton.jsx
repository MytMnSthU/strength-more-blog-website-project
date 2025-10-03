import { PuffLoader } from "react-spinners";

const LoadMoreButton = ({
    children,
    onClickBtn,
	isLoading,
    type = "button",
	isSmall = false,
}) => (
    <button
        onClick={() => {
            onClickBtn();
        }}
        type={type}
        className={`w-full btn ${isSmall ? "max-w-[fit-content] min-h-[50px]" : "max-w-[200px] min-h-[70px]"} px-8 py-4 text-base font-bold uppercase text-white bg-black border-2 border-black leading-none mt-5 disabled:cursor-not-allowed flex justify-center items-center`}
    >
        {isLoading ? <PuffLoader size={26} color="#ffffff" /> : children}
    </button>
);

export default LoadMoreButton