import React from 'react';
import { Image, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect, Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createGame, joinGame } from './reducers/game'
import globalStyle from './globalStyle'
import StorybookUI from '../storybook';

class App extends React.Component {
  state = {
    inputCount: 1,
    name: 'Stephen App'
  }

  addToCount = () => {
    const { inputCount } = this.state
    this.props.addToCount(inputCount)
  }

  createGame = () => {
    this.props.createGame(this.state.name)
  }

  render() {
    const { inputCount } = this.state
    const { gameId, hex } = this.props

    if(this.state.storyBook) {
      return <StorybookUI />
    }

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image style={styles.logo} source={require('./logo.png')} />
          </View>
          <View style={[styles.content, { paddingTop: 0 }]}>
            <Text style={styles.heading}>Welcome to Guess that Hex!</Text>

            <View style={styles.form}>
              <TextInput
                placeholder="Enter your name"
                onTextChange={name => this.setState({ name })}
              />
              <Button onPress={this.createGame} title="Create Game">
                Create Game
              </Button>

              <Text>Game ID: {gameId}</Text>
              <View style={{ marginTop: 36, width: 100, height: 100, backgroundColor: hex }}>
                {hex}
              </View>
              <Button style={styles.storybook} onPress={e => this.setState({ storyBook: true })} title="Storybook">Enter Storybook</Button>

            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'tomato',
    padding: 24,
  },
  container: {
    backgroundColor: '#fafafa',
    borderRadius: 4,
    marginTop: 24,
    marginBottom: 24
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#eee',
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center'
  },
  content: {
    padding: 24,
  },
  logo: {
    width: 300,
    maxWidth: '90%',
    height: 92,
  },
  storybook: {
    marginTop: 24
  },
  // createContainer: {
  //   marginBottom: '2em'
  // },
  // formGroup: {
  //   marginBottom: '1.5em'
  // },
  // label: {
  //   fontWeight: '600',
  //   marginBottom: '0.2em'
  // },
  // input: {
  //   width: '100%',
  // },
  // back: {
  //   color: "#888",
  //   marginLeft: '1em',
  // },
  // submit: {
  //   marginTop: '1.5em'
  // },
  // actions: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   margin: '2em 0 1em'
  // },
  // actionButton: {
  //   margin: '0 0.5em'
  // },
  logo: {
    width: 280,
    height: 80
  }
});

const mapStateToProps = state => {
  return {
    gameId: state.game.id,
    hex: state.game.hex
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createGame,
  joinGame
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(App)
