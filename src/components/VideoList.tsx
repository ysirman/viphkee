import React, { useEffect, useCallback, useState } from "react";

import VideoListItem from "./VideoListItem";
import useGetVideos from "../hooks/useYoutubeResults";
import { VideoListItemType } from "../Types";
import "./VideoList.css";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const VideoList: React.FC = () => {
  const {
    searchApi,
    results,
    pageToken,
    errorMessage,
    isLoading,
  } = useGetVideos();
  const [searchResults, setSearchResults] = useState<VideoListItemType[]>([]);

  const handleScroll = useCallback(() => {
    const windowHeight = document.documentElement.offsetHeight;
    const scrollHeight =
      window.innerHeight + document.documentElement.scrollTop;
    if (windowHeight > scrollHeight) return;
    searchApi("", pageToken);
  }, [isLoading]);

  // TODO:APIのURLをエラーが発生するURLに変更中
  useEffect(() => {
    let isMounted = true;
    const searchButton = document.querySelector(".searchButton")!;
    const searchKeywordElement = document.querySelector<HTMLInputElement>(
      ".searchKeyword input"
    )!;
    searchButton.addEventListener("click", () => {
      if (!isMounted) return;
      setSearchResults([]);
      window.scrollTo(0, 0);
      searchApi(searchKeywordElement.value!);
    });
    searchApi(searchKeywordElement.value!);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) return;
    if (isLoading) return;
    const mergedList = [...searchResults, ...results.items];
    setSearchResults(mergedList);

    return () => {
      isMounted = false;
    };
  }, [isLoading]);

  const videoList = () => {
    const isResultEmpty = searchResults.length === 0;
    return (
      <>
        {isResultEmpty ? (
          <p>Could not find youtube videos.</p>
        ) : (
          searchResults.map(
            (videoListItem: VideoListItemType, index: number) => (
              <VideoListItem key={index} videoListItem={videoListItem} />
            )
          )
        )}
      </>
    );
  };

  const searchResult = () => {
    return <>{errorMessage === "" ? videoList() : <p>{errorMessage}</p>}</>;
  };

  const circularProgress = useCallback(() => {
    if (isLoading) {
      return (
        <Grid className="centerAlign" item xs={12}>
          <CircularProgress />
        </Grid>
      );
    }
  }, [isLoading]);

  return (
    <>
      {searchResult()}
      {circularProgress()}
    </>
  );
};
export default VideoList;
