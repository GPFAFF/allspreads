import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import { toBase64, shimmer } from "../helpers";

const CardStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span;
  gap: 1em;
  h2 {
    margin: 0;
  }
`;

export default function Card(item: {
  url: string;
  key?: string;
  item: { name: string; slug: string; src: string };
}) {
  const { url } = item;
  const { name, slug, src } = item.item;
  const [imageError, setImageError] = useState(false);

  return (
    <CardStyles>
      <h2>{name}</h2>
      <Link href={`/${url}/${slug}`}>
        <Image
          objectFit="cover"
          alt={name}
          onError={() => setImageError(true)}
          src={imageError ? "/logo.svg" : src}
          placeholder="blur"
          blurDataURL={`${src},${toBase64(shimmer(700, 475))}`}
          height={300}
          width={300}
          layout="responsive"
        />
      </Link>
    </CardStyles>
  );
}
