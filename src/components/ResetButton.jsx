const ResetButton = ({ type = "reset", children }) => (
    <button
        type={type}
        className=" px-8 py-4 text-base font-bold uppercase text-black bg-transparent border-2 mt-5 leading-none border-black rounded-[15px]"
    >
        {children}
    </button>
);

export default ResetButton