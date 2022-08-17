import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const Video = ({ data, autoplay, poster }) => {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    videoRef.current.play();
  };

  const togglePlay = () => {
    setShowControls(true);
    setShowPlayButton(false);
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <VideoBox>
      <video
        ref={videoRef}
        poster={poster && poster}
        width="100%"
        height="auto"
        controls
      >
        <source src={data.video.mp4Url} type="video/mp4" />
        <track src="" kind="captions" srclang="en" label="english_captions" />
        Your browser does not support the video tag.
      </video>
      <div class="play-button-wrapper" onClick={togglePlay}>
        {showPlayButton && (
          <div title="Play video" class="play-gif" id="circle-play-b">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 20.6499V9.0999C10 6.53323 12.7833 4.93323 15 6.21657L25 11.9832L35 17.7499C37.2167 19.0332 37.2167 22.2332 35 23.5166L25 29.2832L15 35.0499C12.7833 36.3332 10 34.7332 10 32.1666V20.6499Z"
                fill="white"
              />
            </svg>
          </div>
        )}
      </div>
    </VideoBox>
  );
};

const VideoBox = styled.div`
  width: 100%;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  .video-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2px;
  }
  video[poster] {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 2px;
  }
  .play-button-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    pointer-events: none;
    #circle-play-b {
      cursor: pointer;
      pointer-events: auto;
      background: ${theme.accent};
      width: 80px;
      height: 80px;
      transform: scale(1.5);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      svg {
        width: 40px;
        height: 40px;
        fill: #fff;
        stroke: #fff;
        cursor: pointer;
        background-color: rgba(black, 0.2);
        border-radius: 50%;
        opacity: 0.9;
      }
    }
  }
`;
