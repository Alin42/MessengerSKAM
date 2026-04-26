import { useEffect, useState } from 'react';

const sounds = {
  beep: new Audio('/sounds/beep.mp3'),
} as const

export type SoundName = keyof typeof sounds

export const useSound = (name: SoundName) => {
  const [play, setPlay] = useState(() => () => {});

  useEffect(() => {
    setPlay(() => () => sounds[name].play());
    return sounds[name].pause();
  }, [name]);

  return [play];
};