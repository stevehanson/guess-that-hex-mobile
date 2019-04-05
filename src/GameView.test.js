import { render } from 'react-native-testing-library';
import React from 'react';
import GameView from './GameView';
describe('Game View Tests', () => {
  it('renders a GameView', () => {
    const expected = {
      createdBy: 'Default Props1',
      createdAt: 'Default Props1',
      numberOfPlayers: 2,
      id: 'Default Prop1',
    };

    const { getByTestId } = render(<GameView {...expected} />);

    expect(getByTestId().props).toMatchObject(expected);
  });
});
//test
