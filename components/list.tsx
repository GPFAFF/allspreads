import React from "react";
import styled from "styled-components";
import { Sport } from "../types";

import Card from "./card";

const ListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto;
`;

type Props = {
  url: string;
  sportsList: Sport[] | undefined;
};

export default function List(props: Props) {
  const { sportsList, url } = props;

  return (
    <ListStyles>
      {sportsList?.map((item: Sport) => (
        <Card url={url} key={item.id} item={item} />
      ))}
    </ListStyles>
  );
}
