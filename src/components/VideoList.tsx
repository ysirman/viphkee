import React, { useEffect, useCallback, useState } from "react";

import VideoListItem from "./VideoListItem";
import useGetVideos from "../hooks/useYoutubeResults";
import { VideoListItemType } from "../Types";

import LoadingIcon from "./LoadingIcon";
import ErrorMessage from "./ErrorMessage";

import List from "@material-ui/core/List";

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

  const handleScroll = useCallback(
    (rightMenu: Element) => {
      if (rightMenu.scrollTop + rightMenu.clientHeight < rightMenu.scrollHeight)
        return;
      searchApi("", pageToken);
    },
    [isLoading]
  );

  useEffect(() => {
    const rightMenu = document.querySelector("#rightMenu > div")!;
    rightMenu.addEventListener("scroll", () => handleScroll(rightMenu));
    return () => {
      rightMenu.removeEventListener("scroll", () => handleScroll(rightMenu));
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
    <List>
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
    </List>
  );
};
export default VideoList;
