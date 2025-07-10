const SubmitCommentButton = ({ submitComment }) => (
    <button
        onClick={submitComment}
        className=" px-8 py-4 text-base font-bold uppercase text-white bg-black border-2 border-black leading-none mt-5 disabled:cursor-not-allowed"
    >
        Submit
    </button>
);

export default SubmitCommentButton