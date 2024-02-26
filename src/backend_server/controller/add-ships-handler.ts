import {wsClients} from '../store/ws-clients';
import {games} from '../store/games';
import {type PlayerModel, type addShipsData, type IncomingClientMessage} from '../shared/models';
import {getResponseMessage} from '../shared/utils/response-message';
import {users} from '../store/users';

export const addShipsHandler = (incomingClientMessage: IncomingClientMessage): void => {
  const data = JSON.parse(incomingClientMessage.data);
  const {gameId, ships, indexPlayer} = data as addShipsData;
  const player: PlayerModel = {
    playerId: indexPlayer,
    ships,
  };

  games.addPlayerToGame(gameId, player);
  const game = games.getGames().find(item => item.gameId === gameId);
  if (game != null && game.players.length === 2) {
    startGame(gameId);
  }
};

const startGame = (gameId: string | number): void => {
  const game = games.getGames().find(item => item.gameId === gameId);
  if (game == null) return;
  const {players} = game;
  const gameUsers = users.getUsers().filter(user => players.find(u => u.playerId === user.index));
  wsClients.forEach((value, key) => {
    if (key == null || gameUsers?.find(u => u.currentSessionId === key) == null) return;
    const wsClient = value;
    const gameUser = gameUsers?.find(u => u.currentSessionId === key);
    const player = players?.find(u => u.playerId === gameUser?.index);
    const responseData = JSON.stringify({
      ships: player?.ships,
      currentPlayerIndex: player?.playerId,
    });
    wsClient.send(getResponseMessage('start_game', responseData));
  });
  console.log(`Game ${gameId} started!`);
};
