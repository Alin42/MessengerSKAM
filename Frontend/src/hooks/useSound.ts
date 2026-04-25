import { useEffect, useState } from 'react';

export const useSound = (url: string) => {
  const [play, setPlay] = useState(() => () => {});

  useEffect(() => {
    let audio: HTMLAudioElement | null = new Audio(url);
    if (audio) {
        setPlay(() => () => audio?.play());
    }

    return () => {
      if (audio) {
        audio.pause();
        audio = null;
      }
    };
  }, [url]);

  return [play];
};