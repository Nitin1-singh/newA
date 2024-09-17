import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import Articles from "./Articles";
import axios from "axios";
import Skeleton from "./Skeleton";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
export const URL = "https://newsa-uqaw.onrender.com";
// export const URL = "http://localhost:8000";

function MainPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState([]);
  const [userId, setUserId] = useState([]);

  const generateId = () => {
    return uuidv4();
  };
  const getData = async () => {
    const userId = Cookies.get("userId");
    if (userId === undefined || userId === null) {
      Cookies.set("userId", generateId(), { expires: 7 });
    } else {
      setUserId(userId);
      setLoading(true);
      await axios
        .post(URL + `/article/getArticle`, { sessionId: userId })
        .then((val) => {
          setLoading(false);
          console.log(val.data);
          setArticles(val.data);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Topbar />
      <main>
        {loading ? (
          <div className="w-full h-100 flex justify-center items-center">
            <Skeleton />
          </div>
        ) : (
          <div className="w-100 flex flex-col items-center justify-center gap-3">
            {articles?.map((val) => (
              <Articles userId={userId} getData={getData} data={val} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default MainPage;
