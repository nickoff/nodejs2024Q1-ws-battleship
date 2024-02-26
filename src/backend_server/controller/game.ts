import {wsClients} from '../store/ws-clients';
import {games} from '../store/games';
import {getResponseMessage} from '../shared/utils/response-message';
import {users} from '../store/users';

export const gameTurn = (gameId: string | number, indexPlayer: string | number): void => {
  const game = games.getGames().find(item => item.gameId === gameId);
  if (game == null) return;
  const {players} = game;
  const gameUsers = users.getUsers().filter(user => players.find(u => u.playerId === user.index));
  wsClients.forEach((value, key) => {
    if (key == null || gameUsers?.find(u => u.currentSessionId === key) == null) return;
    const wsClient = value;
    const responseData = JSON.stringify({
      currentPlayer: indexPlayer,
    });
    wsClient.send(getResponseMessage('turn', responseData));
  });
};
