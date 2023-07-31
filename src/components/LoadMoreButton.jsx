const LoadMoreButton = ({
    children,
    onClickBtn,
    isDisableBtn,
    btnLoading,
    setBtnLoading,
    type = "button",
}) => (
    <button
        onClick={() => {
            setBtnLoading(true);
            onClickBtn();
        }}
        type={type}
        disabled={isDisableBtn}
        className=" px-8 py-4 text-base font-bold uppercase text-white bg-black border-2 border-black rounded-[15px] leading-none mt-5 disabled:cursor-not-allowed"
    >
        {btnLoading ? <PuffLoader size={30} color="#ffffff" /> : children}
    </button>
);

export default LoadMoreButton