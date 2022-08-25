import React from "react";
import styled from "styled-components";

import Card from "./card";

const ListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto;
`;

export default function List({ data }) {
  return (
    <ListStyles>
      {data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </ListStyles>
  );
}
