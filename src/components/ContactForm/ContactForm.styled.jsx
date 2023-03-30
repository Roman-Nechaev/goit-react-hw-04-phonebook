import { Form, Field } from 'formik';
import { IoPersonAddOutline } from 'react-icons/io5';

import styled from 'styled-components';

export const Forms = styled(Form)`
  border-bottom: 2px solid rgb(160, 163, 186);
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;

  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

export const Input = styled(Field)`
  margin-top: 10px;
  margin-left: 35px;
  margin-bottom: 20px;
  border-radius: 15px;
  height: 25px;
  width: 180px;
  padding-left: 10px;
  border-color: none;
  display: flex;

  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

  outline: none;

  border: 1px solid rgb(189, 189, 189);

  &:hover,
  &:focus {
    border-color: #46dc82;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;

export const Button = styled.button`
  border: none;
  font: inherit;
  cursor: pointer;
  outline: none;

  margin-left: auto;
  border-radius: 30px;
  padding: 5px 20px;
  background-color: #3fb56e;
  display: flex;

  color: white;

  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

  &:hover,
  &:focus {
    background-color: #3e65b3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;

export const IoPerson = styled(IoPersonAddOutline)``;
