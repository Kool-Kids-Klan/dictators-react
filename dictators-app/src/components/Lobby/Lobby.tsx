import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { SetterOrUpdater } from 'recoil';
import LobbyPlayer from './LobbyPlayer';
import { connect, gameSocket, IGameBoard } from '../BusinessLogic/BusinessLogic';
import { IGameTile } from '../Game/Game';

interface ILobby {
  game: IGameTile[][]
  setGame: SetterOrUpdater<IGameTile[][]>
}

const startGame = () => {
  const data = {
    event: 'START_GAME',
    message: '',
  };
  gameSocket.send(JSON.stringify(data));
};

const getReady = () => {
  const data = {
    event: 'GET_READY',
    message: 'revolko',
  };
  gameSocket.send(JSON.stringify(data));
};

const Lobby: React.FC<ILobby> = (props) => {
  const { game, setGame } = props;
  const [players, setPlayers] = useState([{ name: 'palko', color: 'cerveny' }, { name: 'jozko', color: 'modry' }]);
  connect({ setGame, players, setPlayers });
  let playersBlocks = players.map((player) => (
    <LobbyPlayer name={player.name} color={player.color} />
  ));
  useEffect(() => {
    playersBlocks = players.map((player) => (
      <LobbyPlayer name={player.name} color={player.color} />
    ));
  }, [players]);

  return (
    <div className="lobby">
      <h1>This is game lobby</h1>
      <hr />
      {playersBlocks}
      <LinkContainer to="/game">
        <button type="button" onClick={startGame}>Play</button>
      </LinkContainer>
      <button type="button" onClick={getReady}>Get ready</button>
    </div>
  );
};

export default Lobby;
