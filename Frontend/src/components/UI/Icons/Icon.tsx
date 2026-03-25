import icon2 from "./icon_2.svg";
import icon3 from './icon_3.svg';


const icons = {
  icon2,
  icon3,
} as const;

export type IconName = keyof typeof icons;

export type IconProps = {
  type: IconName;
};

function Icon({ type }: IconProps) {
  const src = icons[type];
  return <img src={src} alt={type} />;
}

export default Icon
