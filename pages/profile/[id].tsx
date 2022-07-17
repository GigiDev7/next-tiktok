import React from "react";
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
  return <div>profile</div>;
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
