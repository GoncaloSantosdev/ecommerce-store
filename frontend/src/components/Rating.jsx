/* eslint-disable react/prop-types */
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex">
        <span className="text-yellow-400 border-yellow-400">
          {value >= 1 ? (
            <FaStar />
          ) : value >= 0.5 ? (
            <FaStarHalf />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-yellow-400 border-yellow-400">
          {value >= 2 ? (
            <FaStar />
          ) : value >= 1.5 ? (
            <FaStarHalf />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-yellow-400 border-yellow-400">
          {value >= 3 ? (
            <FaStar />
          ) : value >= 2.5 ? (
            <FaStarHalf />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-yellow-400 border-yellow-400">
          {value >= 4 ? (
            <FaStar />
          ) : value >= 3.5 ? (
            <FaStarHalf />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-yellow-400 border-yellow-400">
          {value >= 5 ? (
            <FaStar />
          ) : value >= 4.5 ? (
            <FaStarHalf />
          ) : (
            <FaRegStar />
          )}
        </span>
      </div>
      <div>
        <span className="text-white">{text && text}</span>
      </div>
    </div>
  );
};

export default Rating;
