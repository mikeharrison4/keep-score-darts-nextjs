'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

// import ContinueGameModal from './ContinueGameModal';
import { generateFinishers } from '@/app/utils/generateFinishers';
import { type PlayerConfig } from '@/app/components/Dashboard';
import DartValue from '@/app/components/DartValue';
import BoostButtons from '@/app/components/BoostButtons';
import FinisherSuggestions from '@/app/components/FinisherSuggestions';
import ScoreInputs from '@/app/components/ScoreInputs';
import PlayerScore from '@/app/components/PlayerScore';
import GameWon from '@/app/components/GameWon';

const SCORE_VALUES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50,
  0,
];

type ScoreboardProps = {
  playersConfig: Array<PlayerConfig>;
  updatePlayersScore: (score: number) => void;
  nextPlayer: () => void;
  currentPlayerIndex: number;
  onClearGame: () => void;
  SaveGame: React.JSX.Element;
};

const Container = styled.div({
  maxWidth: '75%',
  margin: '20px auto',
  padding: '12px',
});

const DartValues = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  width: '100%',
  gridGap: '1px',
  margin: '20px 0px',

  '> *': {
    cursor: 'pointer',
    height: '40px',
  },

  '> *:last-child': {
    gridColumn: 'span 2',
  },
});

function hasWon(playerScore: number, isCheckoutModeEnabled: boolean) {
  return isCheckoutModeEnabled && playerScore === 0;
}

function hasGoneBust(playerScore: number, isCheckoutModeEnabled: boolean) {
  return playerScore < 0 || (!isCheckoutModeEnabled && playerScore === 0);
}

function Scoreboard({
  playersConfig,
  updatePlayersScore,
  nextPlayer,
  currentPlayerIndex,
  onClearGame,
  onSaveGame,
  SaveGame,
}: ScoreboardProps) {
  const [throws, setThrows] = useState(3);
  const [scores, setScores] = useState<Array<number | null>>([
    null,
    null,
    null,
  ]);
  const [playerScorePerRound, setPlayerScorePerRound] = useState(0);
  const [isDouble, setIsDouble] = useState(false);
  const [isTriple, setIsTriple] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState('');

  const currentPlayerScore = playersConfig[currentPlayerIndex].score;

  function nextPlayerHandler() {
    setThrows(3);
    setScores([null, null, null]);
    setPlayerScorePerRound(0);
    nextPlayer();
  }

  function handleUndo() {
    const scoreIndex = 3 - throws - 1;
    if (!scores[scoreIndex]) return;

    setPlayerScorePerRound((prev) => prev - (scores[scoreIndex] || 0));
    const newScores = [...scores];
    newScores[scoreIndex] = 0;

    setScores(newScores);
    updatePlayersScore(
      currentPlayerScore - (currentPlayerScore + (scores[scoreIndex] || 0))
    );
    setThrows((prev) => prev + 1);
  }

  function handleClickScoreValue(value: number) {
    let dartValue = value;

    if (isDouble) {
      setIsDouble(false);
      dartValue = dartValue * 2;
    }

    if (isTriple) {
      setIsTriple(false);
      dartValue = dartValue * 3;
    }

    setThrows((prev) => prev - 1);

    setScores((prev) => {
      prev[3 - throws] = dartValue;
      return prev;
    });

    setPlayerScorePerRound((prev) => prev + dartValue);

    if (hasGoneBust(currentPlayerScore - dartValue, isDouble)) {
      nextPlayerHandler();
      return;
    }

    updatePlayersScore(dartValue);

    if (hasWon(currentPlayerScore - dartValue, isDouble)) {
      setWinningPlayer(playersConfig[currentPlayerIndex].player);
      return;
    }

    if (throws - 1 === 0) {
      nextPlayerHandler();
    }
  }

  const finishers: Array<string> | null =
    currentPlayerScore <= 170
      ? generateFinishers(currentPlayerScore, throws).sort(
          (a, b) => a.length - b.length
        )[0]
      : null;

  const hasPlayerWon = Boolean(winningPlayer);

  return (
    <>
      {/*{showContinueGamePopup && <ContinueGameModal clearGame={clearGame} />}*/}
      <Container>
        {playersConfig.map(({ player, score }, index) => (
          <PlayerScore
            key={player}
            player={player}
            isActive={currentPlayerIndex === index}
            throws={throws}
            score={score}
          />
        ))}
        <DartValues>
          {SCORE_VALUES.map((value) => (
            <DartValue
              key={value}
              value={value}
              onClick={handleClickScoreValue}
              disabled={
                hasPlayerWon ||
                ((isTriple || isDouble) && [50, 25, 0].includes(value))
              }
            />
          ))}
          <BoostButtons
            hasPlayerWon={hasPlayerWon}
            onClickDouble={() => setIsDouble(true)}
            onClickTriple={() => setIsTriple(true)}
            isDouble={isDouble}
            isTriple={isTriple}
            onClickUndo={handleUndo}
            disableUndoBtn={hasPlayerWon || throws === 3}
          />
        </DartValues>
        {finishers?.length && <FinisherSuggestions finishers={finishers} />}
        <ScoreInputs scores={scores} />
        {!winningPlayer ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={onClearGame}>Clear game</button>
            <div>{playerScorePerRound}</div>
            {SaveGame}
          </div>
        ) : (
          <GameWon winningPlayer={winningPlayer} />
        )}
      </Container>
    </>
  );
}

export default Scoreboard;
