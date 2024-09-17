import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import Articles from "./Articles";
import axios from "axios";
import Skeleton from "./Skeleton";

export const URL = "http://localhost:8000";
function MainPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState([]);
  const getData = async () => {
    setLoading(true);
    await axios
      .get(URL + "/article/getArticle")
      .then((val) => {
        setLoading(false);
        console.log(val.data);
        setArticles(val.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
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
              <Articles getData={getData} data={val} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default MainPage;
