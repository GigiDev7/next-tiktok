import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { url } from "../../config";
import { GetServerSidePropsContext } from "next";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(data.userVideos);
    } else {
      setVideosList(data.userLikedVideos);
    }
  }, [data.userLikedVideos, data.userVideos, showUserVideos]);

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            alt="user image"
            src={data.user.image}
            width={120}
            height={120}
            className="rounded-full"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="md:text-2xl tracking-wider justify-center flex gap-1 items-center text-md font-bold text-primary lowercase">
            {data.user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-xs ">
            {data.user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 w-full bg-white">
          <p
            onClick={() => setShowUserVideos(true)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
          >
            Videos
          </p>
          <p
            onClick={() => setShowUserVideos(false)}
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
          >
            Liked
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length ? (
            videosList.map((item: Video, ind) => (
              <VideoCard key={ind} post={item} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "liked"} videos yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;

  const { data } = await axios.get(`${url}/api/profile/${id}`);

  return {
    props: {
      data,
    },
  };
}

export default Profile;
