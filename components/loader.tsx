import React from 'react';
import styled, { keyframes } from 'styled-components';

const SpinnerStyles = styled.div`
  width: 100px;
  margin: auto;
  text-align: center;
`;

const LoadingText = styled.p`
  color: var(--black);
  margin-top: 5px;
  font-family: Empirez;
  letter-spacing: 3px;
  font-size: 10px;
`;

const motion = keyframes`
  0% { transform: translateX(0) scale(1) }
  25% { transform: translateX(-50px) scale(0.3) }
  50% { transform: translateX(0) scale(1) }
  75% { transform: translateX(50px) scale(0.3) }
  100% { transform: translateX(0) scale(1) }
`;

const BallStyles = styled.div`
  width: 20px;
  height: 20px;
  background-color: var(--green);
  border-radius: 50%;
  display: inline-block;
  animation: ${motion} 3s ease-in-out infinite;
`;

export default function Loader() {
  return (
    <SpinnerStyles>
      <BallStyles />
      <LoadingText>Loading</LoadingText>
    </SpinnerStyles>
  )
}
