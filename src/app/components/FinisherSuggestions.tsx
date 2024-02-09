import React from 'react';

type FinisherSuggestionsProps = {
  finishers: Array<string>;
};

function FinisherSuggestions({ finishers }: FinisherSuggestionsProps) {
  return (
    <div>
      {finishers.map((num, index) => (
        <div key={index}>{num}</div>
      ))}
    </div>
  );
}

export default FinisherSuggestions;
