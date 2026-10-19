import { FaClock } from "react-icons/fa";


const TimeLabel = ({ time }) => (
    <div className=" flex items-center gap-2">
        <FaClock className=" text-sm" />
        <span className=" text-sm font-semibold">{time}</span>
    </div>
);

export default TimeLabel