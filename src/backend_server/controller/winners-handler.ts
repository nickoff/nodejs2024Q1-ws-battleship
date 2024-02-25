import {wsClients} from '../store/ws-clients';
import {winners} from '../store/winners';

export const updateWinners = (): void => {
  wsClients.forEach(value => {
    const wsClient = value;
    wsClient.send(
      JSON.stringify({
        type: 'update_winners',
        data: JSON.stringify(winners.getWinners()),
        id: 0,
      }),
    );
  });
};
