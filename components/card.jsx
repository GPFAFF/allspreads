import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
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

export default function Card({ item }) {
  const { name, src, slug } = item;

  return (
    <CardStyles>
      <h2>{name}</h2>
      <Link href={`/sports/${slug}`}>
        <Image
          objectFit="cover"
          alt={name}
          src={src}
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
