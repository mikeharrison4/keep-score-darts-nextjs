'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '@/app/globalStyles';
import Scoreboard from '@/app/components/Scoreboard';
import GameConfiguration from '@/app/components/GameConfiguration';

export type GameConfig = {
  gameStarted: boolean;
  playersConfig: Array<PlayerConfig>;
  currentPlayerIndex: number;
};

export type PlayerConfig = {
  score: number;
  player: string;
};

const Container = styled.div({
  maxWidth: '1000px',
  color: 'white',
  margin: 'auto',
});

const MainHeading = styled.h1({
  color: 'white',
  padding: '1.2rem',
  borderBottom: '4px solid',
});

const CONFIG_LOCAL_STORAGE_KEY = 'keep-score-darts-config';

function getDataFromStorage(): GameConfig {
  const data =
    localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY) ||
    JSON.stringify(initialGameConfig);

  return JSON.parse(data);
}

function updateDataToStorage(data: Omit<GameConfig, 'gameStarted'>) {
  localStorage.setItem(
    CONFIG_LOCAL_STORAGE_KEY,
    JSON.stringify({ gameStarted: true, ...data })
  );
}

const initialGameConfig: GameConfig = {
  gameStarted: false,
  playersConfig: [],
  currentPlayerIndex: 0,
};

export default function Home() {
  const [gameConfig, setGameConfig] = useState<GameConfig>(initialGameConfig);
  const [scoreOption, setScoreOption] = useState(301);
  const [players, setPlayers] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(true);

  const { gameStarted, playersConfig, currentPlayerIndex } = gameConfig;

  useEffect(() => {
    const storedData = getDataFromStorage();

    if (storedData.gameStarted) {
      setGameConfig(storedData);
    }

    setLoading(false);
  }, []);

  function handleStartGame() {
    const gameConfig: GameConfig = {
      gameStarted: true,
      playersConfig: players.map((player) => ({
        player,
        score: scoreOption,
      })),
      currentPlayerIndex: 0,
    };

    setGameConfig(gameConfig);
    updateDataToStorage(gameConfig);
  }

  function updatePlayersScore(score: number) {
    const players = [...playersConfig];
    players[currentPlayerIndex].score -= score;

    setGameConfig((prev) => {
      return {
        ...prev,
        playersConfig: players,
      };
    });
  }

  function handleAddPlayer(player: string) {
    setPlayers((prevState) => [...prevState, player]);
  }

  function handleSetScoreOption(score: number) {
    setScoreOption(score);
  }

  function nextPlayer() {
    const nextPlayerIndex =
      currentPlayerIndex < playersConfig.length - 1
        ? currentPlayerIndex + 1
        : 0;

    setGameConfig((prev) => ({
      ...prev,
      currentPlayerIndex: nextPlayerIndex,
    }));
    updateDataToStorage({
      playersConfig,
      currentPlayerIndex: nextPlayerIndex,
    });
  }

  function clearGame() {
    setGameConfig(initialGameConfig);
    setPlayers([]);
    setScoreOption(301);
    localStorage.removeItem(CONFIG_LOCAL_STORAGE_KEY);
  }

  return (
    <Container>
      <GlobalStyle />
      <MainHeading>KeepScore Darts 🎯</MainHeading>
      {gameStarted ? (
        <Scoreboard
          playersConfig={playersConfig}
          updatePlayersScore={updatePlayersScore}
          nextPlayer={nextPlayer}
          currentPlayerIndex={currentPlayerIndex}
          clearGame={clearGame}
        />
      ) : loading ? (
        '...loading'
      ) : (
        <>
          <GameConfiguration
            players={players}
            onAddPlayer={handleAddPlayer}
            setScoreOption={handleSetScoreOption}
            scoreOption={scoreOption}
          />
          {players.length > 0 && (
            <button onClick={handleStartGame}>Start</button>
          )}
        </>
      )}
    </Container>
  );
}
