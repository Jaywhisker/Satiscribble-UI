import React from 'react';
import styled from 'styled-components';

//Temporary container component, will require one that retrives data from database

interface ContainerWithBorderProps {
  text: string;
}

const Wrapper = styled.div`
  padding-left: 18px;
  padding-right: 18px;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; 
  padding: 2px 12px; 
  margin: 20px 0; 
  border: 2px solid var(--Nice_Blue); 
  border-radius: 5px; 
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  color: var(--Nice_Blue); 
  font-size: 15px; 
  box-sizing: border-box; // Includes padding and border in the element's total width and height
  background-color: var(--Dark_Grey); 
`;

const ContainerWithBorder: React.FC<ContainerWithBorderProps> = ({ text }) => {
  return (
    <Wrapper>
      <StyledContainer>{text}</StyledContainer>
    </Wrapper>
  );
};

export default ContainerWithBorder;
