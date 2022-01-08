import React, { useState } from 'react';
import styled from 'styled-components';
import Contact from '../components/Contact';

const StyledHomePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px;
`;

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (

    <StyledHomePage>
      <h2>The largest most up-to-date sports odds website.</h2>
      <p>Coming soon.</p>
      {isOpen ? (
        <Contact
          id="contactForm"
          setIsOpen={toggleIsOpen}
        />
      ) : <button type="button" onClick={toggleIsOpen}>Contact us</button>}
      <form name="contact" netlify netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message" />
      </form>
    </StyledHomePage>
  );
};

export default HomePage;
