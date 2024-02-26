import {getResponseMessage} from '../shared/utils/response-message';
import {wsClients} from '../store/ws-clients';
import {winners} from '../store/winners';

export const updateWinners = (): void => {
  wsClients.forEach(value => {
    const wsClient = value;
    const responseData = JSON.stringify(winners.getWinners());
    wsClient.send(getResponseMessage('update_winners', responseData));
  });
};
