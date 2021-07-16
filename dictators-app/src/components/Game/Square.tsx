import React from 'react';
import { useRecoilState } from 'recoil';
import { Coor, gameState, premovesState } from '../../store/atoms';

interface ISquare {
  army?: number,
  owner?: string,
  terrain?: string,
  coords: Coor
}

const Square: React.FC<ISquare> = (props) => {
  const {
    army, owner, terrain, coords,
  } = props;

  const [{ selected }, selectSquare] = useRecoilState(gameState);
  const [premoves] = useRecoilState(premovesState);
  // TODO compare as whole??? not by parts
  const selectClass = (selected && coords[0] === selected[0] && coords[1] === selected[1]) ? 'selected' : '';
  // TODO overwrites terrain in CSS
  let directions = '';
  premoves.forEach((premove) => {
    if (premove.from[0] === coords[0] && premove.from[1] === coords[1]) {
      directions += `${premove.direction} `;
    }
  });

  return (
    <td className={`${owner} ${terrain} ${selectClass} ${directions}`} onClick={() => selectSquare({ selected: coords })}>{army}</td>
  );
};

export default Square;