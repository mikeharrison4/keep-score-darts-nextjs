import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { PlayerConfig } from '@/app/components/Dashboard';
import { UUID } from 'crypto';

type SaveGameProps = {
  userId: UUID;
  playersConfig: Array<PlayerConfig>;
};

function SaveGame({ userId, playersConfig }: SaveGameProps) {
  const supabase = createClient();

  // FIND A WAY TO UPDATE RATHER THAN INSERT WHEN USER ID ALREADY EXISTS

  async function saveGame() {
    const { error } = await supabase
      .from('saved_games')
      .upsert({ id: userId, players: playersConfig });
  }

  return <button onClick={saveGame}>Save game</button>;
}

export default SaveGame;
