'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameConfiguration from '@/app/components/GameConfiguration';
import Scoreboard from '@/app/components/Scoreboard';

export type PlayerConfig = {
  score: number;
  player: string;
};

export type GameConfig = {
  gameStarted: boolean;
  playersConfig: Array<PlayerConfig>;
  currentPlayerIndex: number;
};

const Container = styled.div({
  color: 'white',
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

function Config() {
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

  function updatePlayersScore(value: number) {
    const players = [...playersConfig];
    players[currentPlayerIndex].score -= value;

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
      {gameStarted ? (
        <Scoreboard
          playersConfig={playersConfig}
          updatePlayersScore={updatePlayersScore}
          nextPlayer={nextPlayer}
          currentPlayerIndex={currentPlayerIndex}
          clearGame={clearGame}
        />
      ) : loading ? (
        '...Loading'
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

export default Config;
