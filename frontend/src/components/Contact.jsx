/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px 0;
  border-radius: 4px;
  background: #d8d8d8;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 8px 0;
  padding: 4px;
`;

const StyledTextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 8px 0;
  padding: 4px;
`;

const Contact = ({ setIsOpen }) => {
  const initialFormState = {
    formName: 'contact',
    surname: '',
    email: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState(null);

  const { surname, email, message } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => (
    Object.values(formData).every(Boolean)
  );

  const handleSubmit = (event) => {
    if (isFormValid()) {
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encode({
          'form-name': initialFormState.formName,
          ...formData,
        }),
      })
        .then(() => setStatus('Form Submission Successful!'))
        .catch((error) => setStatus(`Form Submission Failed! ${error}`));
    }

    setIsOpen(false);

    event.preventDefault();
  };

  return (
    <section>
      <div className="alternate-color">
        <h2>Drop us a line!</h2>
        <p>Get more info about AllSpreads.</p>
      </div>
      <div>
        {status ? (
          <h2>{status}</h2>
        ) : (
          <StyledForm
            name="contact"
            data-netlify="true"
            onSubmit={handleSubmit}
            data-netlify-honeypot="bot-field"
            id="contact-form"
            noValidate
            method="POST"
          >
            <input type="hidden" name="contact" value="contact" />
            <StyledLabel>
              Name:
              <StyledInput
                id="surname"
                type="text"
                name="surname"
                value={surname}
                required
                onChange={handleChange}
              />
            </StyledLabel>
            <StyledLabel>
              Email:
              <StyledInput
                id="inputEmail"
                type="email"
                name="email"
                label="Your Email:"
                value={email}
                required
                onChange={handleChange}
              />
            </StyledLabel>
            <StyledLabel>
              Message:
              <StyledTextArea
                id="message"
                name="message"
                label="Your Message:"
                value={message}
                required
                onChange={handleChange}
              />
            </StyledLabel>
            <p>
              <button type="submit">Send</button>
            </p>
          </StyledForm>
        )}
      </div>
    </section>
  );
};

export default Contact;
