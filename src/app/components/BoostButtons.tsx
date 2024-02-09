import React from 'react';
import styled from 'styled-components';

type BoostButtonsProps = {
  hasPlayerWon: boolean;
  onClickDouble: () => void;
  onClickTriple: () => void;
  isDouble: boolean;
  isTriple: boolean;
  disableUndoBtn: boolean;
  onClickUndo: () => void;
};

const BoostScoresAndUndo = styled.div({
  display: 'flex',

  '> *': {
    width: '100%',
    cursor: 'pointer',
  },
});

const BoostButton = styled.button({
  border: 'none',

  ':disabled': {
    cursor: 'not-allowed',
  },
});

const DoubleBtn = styled(BoostButton)<{ selected: boolean }>(
  ({ selected }) => ({
    background: 'orange',
    ...(selected && { border: '3px solid black' }),

    ':hover': {
      opacity: '.8',
    },
  })
);

const TripleBtn = styled(BoostButton)<{ selected: boolean }>(
  ({ selected }) => ({
    background: 'orangered',
    ...(selected && { border: '3px solid black' }),

    ':hover': {
      opacity: '.8',
    },
  })
);

const UndoBtn = styled(BoostButton)({
  background: 'red',

  ':hover': {
    opacity: '.8',
  },
});

function BoostButtons({
  hasPlayerWon,
  onClickDouble,
  onClickTriple,
  isDouble,
  isTriple,
  disableUndoBtn,
  onClickUndo,
}: BoostButtonsProps) {
  return (
    <BoostScoresAndUndo>
      <DoubleBtn
        disabled={hasPlayerWon}
        onClick={onClickDouble}
        selected={isDouble}
      >
        Double
      </DoubleBtn>
      <TripleBtn
        disabled={hasPlayerWon}
        onClick={onClickTriple}
        selected={isTriple}
      >
        Triple
      </TripleBtn>
      <UndoBtn onClick={onClickUndo} disabled={disableUndoBtn}>
        Undo
      </UndoBtn>
    </BoostScoresAndUndo>
  );
}

export default BoostButtons;
