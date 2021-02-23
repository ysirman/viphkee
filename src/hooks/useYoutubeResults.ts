import { useEffect, useState } from "react";
import axios from "axios";

import { YoutubeSearchResult } from "../Types";
import { hoge, youtubeApiUrlSearch } from "../utils/youtubeUrls";

const useGetVideos = () => {
  const initResults = {
    nextPageToken: "",
    items: [],
  };
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<YoutubeSearchResult>(initResults);
  const [errorMessage, setErrorMessage] = useState("");
  const [pageToken, setPageToken] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const searchApi = (keyword: string, pageToken: string = "") => {
    if (isLoading) return;
    if (pageToken === "" && keyword === "") return;
    if (pageToken !== "" && results.items.length === 0) return;
    if (pageToken === "") setSearchKeyword(keyword);
    setIsLoading(true);
    axios
      .get(youtubeApiUrlSearch(keyword, pageToken))
      .then((response) => {
        setResults(response.data);
        setPageToken(response.data.nextPageToken);
      })
      .catch(() => {
        setErrorMessage("Failed to get youtube api data.");
        console.log("[ERROR] Failed to get youtube api data.");
      })
      .finally(() => {
        // setIsLoading(false);
        // console.log("Youtube API called");
        setErrorMessage("");
        const time = 1000;
        if (pageToken !== "" && parseInt(pageToken) + 1 > 2) {
          setTimeout(() => {
            setResults(hoge[0]);
            setPageToken(hoge[0].nextPageToken);
            setIsLoading(false);
          }, time);
          return;
        }
        if (pageToken === "") {
          setTimeout(() => {
            setResults(hoge[0]);
            setPageToken(hoge[0].nextPageToken);
            setIsLoading(false);
          }, time);
        } else {
          setTimeout(() => {
            setResults(hoge[parseInt(pageToken) + 1]);
            setPageToken(hoge[parseInt(pageToken) + 1].nextPageToken);
            setIsLoading(false);
          }, time);
        }
      });
  };

  useEffect(() => {
    searchApi(searchKeyword);
  }, []);

  return {
    searchApi,
    results,
    pageToken,
    errorMessage,
    isLoading,
  };
};
export default useGetVideos;
