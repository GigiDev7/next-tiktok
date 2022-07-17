import axios from "axios";
import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { url } from "../../config";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import { useRouter } from "next/router";
import { Video } from "../../types";
import NoResults from "../../components/NoResults";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);

  const router = useRouter();

  const { searchTerm } = router.query;

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  return (
    <div className="w-full ">
      <div>
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
        >
          Videos
        </p>
        <p
          onClick={() => setIsAccounts(false)}
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
        >
          Liked
        </p>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const searchTerm = context.params?.searchTerm;

  const { data } = await axios.get(`${url}/api/search/${searchTerm}`);

  return {
    props: {
      videos: data,
    },
  };
}

export default Search;
