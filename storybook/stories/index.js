import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';
import WaitingForPlayers from '../../src/WaitingForPlayers'
import GameGuessing from '../../src/GameGuessing'

const noop = () => {}
const players = [{ name: 'Stephen' }, { name: 'Dawn', guess: 'yellow', }, { name: 'Frasier', guess: '#ff0044' }]

storiesOf('GameGuessing', module)
  .add('game', () => (
    <GameGuessing hex="#ff88aa" players={players} onReveal={noop} creator={true} />
  ));

storiesOf('WaitingForPlayers', module)
  .add('with players', () => (
    <WaitingForPlayers players={players} creator={false} onStart={noop} />
  ))
  .add('with players as creator', () => (
    <WaitingForPlayers players={players} creator={true} onStart={noop} />
  ))

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));
