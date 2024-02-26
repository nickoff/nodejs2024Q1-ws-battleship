import {wsClients} from '../store/ws-clients';
import {games} from '../store/games';
import {getResponseMessage} from '../shared/utils/response-message';
import {users} from '../store/users';
import {type Position, type IncomingClientMessage, type AttackData} from '../shared/models';
import {winners} from '../store/winners';
import {updateWinners} from './winners-handler';

export const gameTurn = (gameId: string | number, indexPlayer: string | number): void => {
  const game = games.getGames().find(item => item.gameId === gameId);
  if (game == null) return;
  const {players} = game;
  const gameUsers = users.getUsers().filter(user => players.find(u => u.playerId === user.index));
  game.currentPlayerIndex = indexPlayer;
  wsClients.forEach((value, key) => {
    if (key == null || gameUsers?.find(u => u.currentSessionId === key) == null) return;
    const wsClient = value;
    const responseData = JSON.stringify({
      currentPlayer: indexPlayer,
    });
    wsClient.send(getResponseMessage('turn', responseData));
  });
};

export const gameAttackResult = (
  gameId: string | number,
  indexPlayer: string | number,
  position: Position,
  status: string,
): void => {
  const game = games.getGames().find(item => item.gameId === gameId);
  if (game == null) return;
  const {players} = game;
  const gameUsers = users.getUsers().filter(user => players.find(u => u.playerId === user.index));
  wsClients.forEach((value, key) => {
    if (key == null || gameUsers?.find(u => u.currentSessionId === key) == null) return;
    const wsClient = value;
    const responseData = JSON.stringify({
      position,
      currentPlayer: indexPlayer,
      status,
    });
    wsClient.send(getResponseMessage('attack', responseData));
  });
};

export const attackHandler = (incomingClientMessage: IncomingClientMessage): void => {
  const data: AttackData = JSON.parse(incomingClientMessage.data);
  const playerId = data.indexPlayer;
  let positionAtack: Position;
  if (data.x == null || data.y == null) {
    positionAtack = {x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10)};
  } else {
    positionAtack = {x: data.x, y: data.y};
  }
  const game = games.getGames().find(item => item.gameId === data.gameId);
  if (game == null || game.currentPlayerIndex !== playerId) return;
  const enemyPlayer = game.players.find(item => item.playerId !== playerId);
  if (enemyPlayer == null) return;
  const statusAttack = enemyPlayer.shipsStatus?.find(item =>
    item.positions.find(p => p.x === positionAtack.x && p.y === positionAtack.y),
  );
  if (statusAttack == null) {
    gameAttackResult(game.gameId, playerId, positionAtack, 'miss');
    gameTurn(game.gameId, enemyPlayer.playerId);
  } else {
    const status = games.updateGameStatus(game, enemyPlayer.playerId, positionAtack);
    if (status != null) {
      gameAttackResult(game.gameId, playerId, positionAtack, status);
      gameTurn(game.gameId, playerId);
    }
  }
};

export const finishGame = (winnerId: string | number): void => {
  wsClients.forEach(value => {
    const wsClient = value;
    const responseData = JSON.stringify({
      winPlayer: winnerId,
    });
    const winnerUser = users.getUsers().find(user => user.index === winnerId);
    if (winnerUser != null) {
      winners.addWinner(winnerUser.name);
    }
    wsClient.send(getResponseMessage('finish', responseData));
    updateWinners();
  });
};
