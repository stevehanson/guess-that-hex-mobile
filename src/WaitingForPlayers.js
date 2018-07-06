import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import globalStyle from './globalStyle'

class WaitingForPlayers extends Component {
  state = { loadingDots: '' }

  componentDidMount() {
    this.interval = setInterval(() => {
      let loadingDots = this.state.loadingDots
      if(loadingDots.length === 5) {
        loadingDots = ''
      } else {
        loadingDots += '.'
      }
      this.setState({ loadingDots })
    }, 600)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  copyText = (text) => {
    // copy(text)
    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, 2000)
  }

  render() {
    const { gameId, players, creator, onStart } = this.props
    const { loadingDots, copied } = this.state
    const joinUrl = `${window.location.protocol}//${window.location.host}/join/${encodeURIComponent(gameId)}`

    return (
      <View style={styles.container}>
        <Text style={styles.h2}>Waiting for players...</Text>
        {creator && (
          <View>
            <View style={styles.gamedIdText}>Other players can join by navigating here:</View>
            <View style={styles.gameId}>
              <Text style={styles.joinUrl}>{joinUrl}</Text>
            </View>
            <Button title="Copy" onPress={e => this.copyText(joinUrl)}>Copy</Button>
            {copied && <Text>copied!</Text>}
          </View>
        )}
        <View style={styles.activity}>
          {players.map(player => (
            <Text style={styles.player} key={player.name}>{player.name} joined the game!</Text>
          ))}
          <Text style={styles.loadingDots}>{loadingDots}</Text>
        </View>

        {creator && (
          <Button title="Start the game" onPress={onStart}>Start the game!</Button>
        )}
      </View>
    )
  }
}

const styles = {
  container: {
    margin: 24,
    backgroundColor: globalStyle.colors.almostWhite,
    borderRadius: globalStyle.borderRadius,
    padding: globalStyle.padding.default,
  },
  activity: {
    display: 'flex',
    marginTop: 24,
    fontSize: 19,
    lineHeight: '1.7'
  },
  player: {
    marginBottom: 10
  },
  loadingDots: {
    fontSize: 22,
    fontWeight: '900',
    height: 35,
    color: globalStyle.colors.primary,
    listStyleType: 'none',
    marginTop: 8
  },
  gameIdContainer: {
    marginTop: 24,
    textAlign: 'center',
  },
  gameIdText: {

  },
  gameId: {
  }
}

export default WaitingForPlayers
