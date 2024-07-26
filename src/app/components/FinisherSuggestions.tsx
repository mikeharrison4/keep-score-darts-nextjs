import React from 'react';
import styled from 'styled-components';

type FinisherSuggestionsProps = {
  finisher: Array<string>;
};

const Container = styled.div({
  display: 'flex',
  width: '30%',
  justifyContent: 'space-between',
  margin: 'auto',
  marginBottom: '20px',
});

const Dart = styled.span({
  fontWeight: 'bold',
});

function FinisherSuggestions({ finisher }: FinisherSuggestionsProps) {
  return (
    <Container>
      FINISH WITH:
      {finisher.map((num, index) => (
        <Dart key={index}>{num}</Dart>
      ))}
    </Container>
  );
}

export default FinisherSuggestions;
