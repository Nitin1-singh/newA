import axios from "axios";
import React, { useState } from "react";
import { URL } from "./MainPage";
import { BiDownvote, BiSolidDownvote, BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
function Articles({ data, getData }) {
  const [votes, setVotes] = useState(data?.votes);
  const [hasUpvoted, setHasUpvoted] = useState(data?.hasUpvoted);
  const [hasDownvoted, setHasDownvoted] = useState(data?.hasDownvoted);

  const handleVote = async (articleUrl, voteType) => {
    await axios
      .post(URL + "/article/vote", { url: articleUrl, voteType })
      .then((val) => {
        console.log(val);
        if (val?.data?.success) {
          if (voteType === "downvote") {
            setHasDownvoted(true);
            setHasUpvoted(false);
          } else if (voteType === "upvote") {
            setHasDownvoted(false);
            setHasUpvoted(true);
          }
        }
        setVotes(val?.data?.votes);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleVoteRedo = async (articleUrl, voteType) => {
    await axios
      .post(URL + "/article/redoVote", { url: articleUrl, voteType })
      .then((val) => {
        console.log(val);
        if (val?.data?.success) {
          setVotes(val?.data?.votes);
          if (voteType === "downvote") setHasDownvoted(false);
          else if (voteType === "upvote") setHasUpvoted(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="flex mt-5 flex-col gap-3 border-[0.5px] border-slate-400 rounded-md h-100 w-[600px] p-6">
      {data?.title}
      <div className="flex flex-col items-center w-[30px]">
        {hasUpvoted ? (
          <BiSolidUpvote
            className="text-black hover:cursor-pointer"
            size={30}
            onClick={() => handleVoteRedo(data?.url, "upvote")}
          />
        ) : (
          <BiUpvote
            // fill="red"
            className="text-black hover:cursor-pointer"
            size={30}
            onClick={() => handleVote(data?.url, "upvote")}
          >
            Upvote
          </BiUpvote>
        )}
        <p>{votes?.upvotes - votes?.downvotes}</p>
        {hasDownvoted ? (
          <BiSolidDownvote
            className="text-black hover:cursor-pointer"
            size={30}
            onClick={() => handleVoteRedo(data?.url, "downvote")}
          />
        ) : (
          <BiDownvote
            className="text-black hover:cursor-pointer"
            size={30}
            onClick={() => handleVote(data?.url, "downvote")}
          >
            Downvote
          </BiDownvote>
        )}
      </div>
      <img
        alt={`${data?.title}`}
        className="w-full object-cover h-[200px]"
        src={data?.urlToImage}
      />
      <p>{data?.description}</p>
      <p>Author: {data?.author}</p>
      <a
        target="_blank"
        className="flex justify-end underline"
        href={`${data?.url}`}
      >
        Read More
      </a>
    </div>
  );
}

export default Articles;
