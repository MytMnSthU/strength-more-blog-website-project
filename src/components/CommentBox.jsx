import { FaUserAlt } from "react-icons/fa";
import TimeLabel from "./TimeLabel";




const CommentBox = ({ comment }) => (
    <div className=" flex items-start gap-3">
        <div className="w-fit relative">
            <div className=" rounded-full bg-white p-2 border border-black relative z-10">
                <FaUserAlt />
            </div>
            <div className=" w-full h-full bg-black absolute rounded-full top-0 left-0 z-0 translate-x-[2px] translate-y-[2px]"></div>
        </div>

        <div className=" w-full relative">
            <div className=" bg-white rounded-[15px] border border-black p-2.5 grid gap-1 relative z-10">
                <span className=" text-lg font-bold">{comment.username}</span>
                <TimeLabel time={comment.createdAt} />
                <p className=" text-xl px-3 font-medium mt-3">
                    {comment.title}
                </p>
            </div>
            <div className=" w-full h-full bg-black rounded-[15px] absolute top-0 left-0 translate-x-1 translate-y-1"></div>
        </div>
    </div>
);

export default CommentBox