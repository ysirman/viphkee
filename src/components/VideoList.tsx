import React, { useEffect, useCallback, useState } from "react";

import VideoListItem from "./VideoListItem";
import useGetVideos from "../hooks/useYoutubeResults";
import { VideoListItemType } from "../Types";

import LoadingIcon from "./LoadingIcon";
import ErrorMessage from "./ErrorMessage";

import Grid from "@material-ui/core/Grid";

const VideoList: React.FC = () => {
  const {
    searchApi,
    results,
    pageToken,
    errorMessage,
    isLoading,
  } = useGetVideos();
  const [searchResults, setSearchResults] = useState<VideoListItemType[]>([]);

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

  const handleScroll = useCallback(() => {
    const windowHeight = document.documentElement.offsetHeight;
    const scrollHeight =
      window.innerHeight + document.documentElement.scrollTop;
    if (windowHeight > scrollHeight) return;
    searchApi("", pageToken);
  }, [isLoading]);

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

  return (
    <Grid container spacing={3} justify="center">
      <ErrorMessage
        isErrorEmpty={errorMessage === "" || isLoading}
        message={errorMessage}
      />
      <ErrorMessage
        isErrorEmpty={searchResults.length !== 0 || isLoading}
        message={"Could not find youtube videos."}
      />
      {searchResults.map((videoListItem: VideoListItemType, index: number) => (
        <VideoListItem key={index} videoListItem={videoListItem} />
      ))}
      <LoadingIcon isLoading={isLoading} />
    </Grid>
  );
};
export default VideoList;
