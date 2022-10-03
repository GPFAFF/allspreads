import React, { useState } from "react";
import Image from "next/image";
import { findFallback, formatName, getFilePrefix } from "../helpers";

type Props = {
  team: string;
  height: number;
  width: number;
  objectFit?: any;
  slug: any;
  alt: string;
  style?: any;
};

export default function TeamLogo(props: Props) {
  const { team, height, width, objectFit, slug, style } = props;
  const [imageError, setImageError] = useState(false);

  const path = getFilePrefix(slug);

  return (
    <Image
      style={style}
      alt={team}
      height={height}
      width={width}
      objectFit={objectFit}
      onError={() => setImageError(true)}
      src={
        imageError
          ? findFallback(path || team)
          : path || team
          ? formatName(team, slug)
          : "/logo.svg"
      }
    />
  );
}
