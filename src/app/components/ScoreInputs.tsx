import React from 'react';
import styled from 'styled-components';

type ScoreInputsProps = {
  scores: Array<number | null>;
};

const Inputs = styled.div({
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
  width: '25%',
});

const Input = styled.div({
  background: 'white',
  padding: '4px 10px',
  margin: '4px',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '30px',
});

function ScoreInputs({ scores }: ScoreInputsProps) {
  return (
    <Inputs>
      {scores.map((score, index) => (
        <Input key={index}>{score}</Input>
      ))}
    </Inputs>
  );
}

export default ScoreInputs;
