import React from "react";

import VideoListItem from "../molecules/VideoListItem";
import { VideoListItemType } from "../../Types";

import LoadingIcon from "../molecules/LoadingIcon";
import ErrorMessage from "../molecules/ErrorMessage";

import List from "@material-ui/core/List";

const VideoList: React.FC<{
  searchResults: VideoListItemType[];
  isLoading: boolean;
  errorMessage: string;
}> = ({ searchResults, isLoading, errorMessage }) => {
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
