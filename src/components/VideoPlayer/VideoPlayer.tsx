import { FC, useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  fileName: string;
  onLoaded: () => void;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ fileName, onLoaded }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  const checkVideoState = (videoPlayer: HTMLVideoElement) => {
    const checkInterval = setInterval(() => {
      if (videoPlayer.readyState === 4) {
        setLoaded(() => true);
        clearInterval(checkInterval);
      }
    }, 1000);
  };

  useEffect(() => {
    if (videoPlayerRef.current) {
      checkVideoState(videoPlayerRef.current);
    }
  }, [videoPlayerRef]);

  useEffect(() => {
    if (loaded) onLoaded();
  }, [loaded]);

  return (
    <video autoPlay controls loop ref={videoPlayerRef}>
      <source src={`http://localhost:5000/files/${fileName}`} />
    </video>
  );
};

export default VideoPlayer;
