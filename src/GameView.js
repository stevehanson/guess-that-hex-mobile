import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
export default class GameView extends Component {
  render() {
    return (
      <View testID={this.props.id}>
        <Text>{this.props.createdBy}</Text>
        <Text>{this.props.createdAt}</Text>
        <Text>{this.props.numberOfPlayers}</Text>
      </View>
    );
  }
}
GameView.propType = {
  createdBy: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

GameView.defaultProps = {
  createdBy: 'Default Props',
  createdAt: 'Default Props',
  numberOfPlayers: 0,
  id: 'Default Prop',
};
