// VideoPlayer.js
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayPauseClick = () => {

    setIsPlaying(!isPlaying);

  };

  const handleVideoClick = () => {
   
    handlePlayPauseClick();
  };

  const handleMuteClick = () => {
    
    setIsMuted(!isMuted);
    console.log(isMuted,'mouteddd');
  };

  return (
    <div style={{ position: 'relative' }}>
      <ReactPlayer
        ref={videoRef}
        url={url}
        width="320px"
        height="340px"
        playing={isPlaying}
        muted={isMuted}
        controls={false}
        onClick={handleVideoClick}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        
      />
      {!isPlaying && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={handlePlayPauseClick}
        >
          <IconButton style={{ color: 'white' }} onClick={handlePlayPauseClick}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </div>
      )}

    {isPlaying && (
            <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            
            }}
            onClick={handlePlayPauseClick}
            >
            <IconButton style={{ color: 'white' }} onClick={handlePlayPauseClick}>
                {isPlaying ? '': <PlayArrowIcon />}
            </IconButton>
            </div>
        )}
      <IconButton
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          color: 'white',
        }}
        onClick={handleMuteClick}
      >
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
    </div>
  );
};

export default VideoPlayer;
