import axios from "axios";
import React, { useState } from "react";
import { URL } from "./MainPage";
import { BiDownvote, BiSolidDownvote, BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
function Articles({ data, userId }) {
  const [votes, setVotes] = useState(data?.votes);
  const [hasUpvoted, setHasUpvoted] = useState(data?.hasUpvoted);
  const [hasDownvoted, setHasDownvoted] = useState(data?.hasDownvoted);

  const handleVote = async (articleUrl, voteType) => {
    await axios
      .post(URL + "/article/vote", {
        url: articleUrl,
        voteType,
        sessionId: userId,
      })
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
      .post(URL + "/article/redoVote", {
        url: articleUrl,
        voteType,
        sessionId: userId,
      })
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
      <div className="flex flex-col items-start justify-end w-[150px]">
        {hasUpvoted ? (
          <div className="flex">
            <BiSolidUpvote
              className="text-black hover:cursor-pointer"
              size={30}
              onClick={() => handleVoteRedo(data?.url, "upvote")}
            />
            <p>{votes?.upvotes} Upvotes</p>
          </div>
        ) : (
          <div className="flex">
            <BiUpvote
              // fill="red"
              className="text-black hover:cursor-pointer"
              size={30}
              onClick={() => handleVote(data?.url, "upvote")}
            >
              Upvote
            </BiUpvote>
            <p>{votes?.upvotes} Upvotes</p>
          </div>
        )}
        <p className="ms-3 w-100 justify-end items-end">
          {votes?.upvotes - votes?.downvotes}
        </p>
        {hasDownvoted ? (
          <div className="flex">
            <BiSolidDownvote
              className="text-black hover:cursor-pointer"
              size={30}
              onClick={() => handleVoteRedo(data?.url, "downvote")}
            />
            <p>{votes?.downvotes} Down Votes</p>
          </div>
        ) : (
          <div className="flex">
            <BiDownvote
              className="text-black hover:cursor-pointer"
              size={30}
              onClick={() => handleVote(data?.url, "downvote")}
            >
              Downvote
            </BiDownvote>
            <p>{votes?.downvotes} Down Votes</p>
          </div>
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
