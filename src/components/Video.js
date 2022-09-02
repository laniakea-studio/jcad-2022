import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../theme/theme";

export const Video = ({ data, autoplay, poster }) => {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);
  const seekBarRef = useRef(null);

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

  /*
  useEffect(() => {
    // Video and seekbar
    const video = videoRef.current;
    const seekBar = seekBarRef.current;

    // Positions of markers in seconds.
    const positions = [3, 6.5, 7];

    // Set the markers when we CAN know the duration of the video.
    video.addEventListener("loadedmetadata", () => {
      // Add each marker to the #seekbar element.
      positions.forEach(function (position) {
        // Is position within range of the duration?
        if (position <= video.duration) {
          // Calculate position in percentage..
          const left = (position / video.duration) * 100 + "%";

          // ..create marker and give it the left value..
          const marker = document.createElement("div");
          marker.classList.add("bubles");
          marker.style.left = left;

          // ..and add the marker to the #seekbar.
          seekBar.appendChild(marker);
        }
      });
    });
  });
*/
  return (
    <VideoBox
      className="VideoBox"
      css={`
        .seek-bar {
          position: relative;
        }
        .bubles {
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
        }
      `}
    >
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
      <div id="video-controls">
        <div id="seek-bar-container">
          <div className="seek-bar" ref={seekBarRef}>
            <div id="current-time"></div>
          </div>
        </div>
      </div>
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
