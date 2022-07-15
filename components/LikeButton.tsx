import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

const LikeButton = ({
  handleLike,
  handleDislike,
  likes,
}: {
  handleLike: () => Promise<void>;
  handleDislike: () => Promise<void>;
  likes: any[];
}) => {
  const [alreadyLiked, setAlreadyLike] = useState(false);

  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  const { userProfile }: any = useAuthStore();

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLike(true);
    } else {
      setAlreadyLike(false);
    }
  }, [likes, filterLikes]);

  return (
    <div className="flex gap-6 ">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            onClick={handleDislike}
            className="bg-primary rounded-full p-2 md:p-4 text-[#f51997]"
          >
            <MdFavorite className="text-lg md:text-2xl " />
          </div>
        ) : (
          <div
            onClick={handleLike}
            className="bg-primary rounded-full p-2 md:p-4 "
          >
            <MdFavorite className="text-lg md:text-2xl " />
          </div>
        )}
        <p>{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
