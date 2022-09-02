import React from "react";
import Image from "next/image";
import { formatName, getFilePrefix } from "../helpers";
// import { findByName } from "../helpers/find-logo";

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

  const path = getFilePrefix(slug);

  return (
    <Image
      style={style}
      alt={team}
      height={height}
      width={width}
      objectFit={objectFit}
      src={`${path || team ? formatName(team, slug) : "/logo.svg"}`}
    />
  );
}
