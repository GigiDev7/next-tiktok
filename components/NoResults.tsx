import React from "react";
import { NextPage } from "next";

import { MdOutlineVideocamOff } from "react-icons/md";

const NoResults: NextPage<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-2x; text-center">{text}</p>
    </div>
  );
};

export default NoResults;
