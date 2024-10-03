import { IconMap, icons } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

const EmptyIcon: React.ElementType = () => null;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconMap;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Icon = ({
  name,
  className,
  size = 20,
  ...rest
}: IconProps): JSX.Element => {
  const IconComponent = icons[name] || EmptyIcon;

  return (
    <IconComponent
      {...rest}
      className={cn("text-inherit", className)}
      height={size}
      width={size}
    />
  );
};

export default Icon;
