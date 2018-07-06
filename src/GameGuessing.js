import React, { Component } from 'react'
import { View, TextInput, Text, Button } from 'react-native'
import globalStyle from './globalStyle'
import tinycolor from 'tinycolor2'

class GameGuessing extends Component {
  state = { guess: '', loadingDots: '...' }

  submit = (e) => {
    const { guess } = this.state
    e.preventDefault()
    if(!tinycolor(guess).isValid()) {
      alert('The color you entered is not valid. Please make sure it\'s a valid 3 or 6 character hex code or a CSS named color.')
      return
    }

    this.props.onSubmit(guess)
  }

  render() {
    const { hex, players, onReveal, creator } = this.props
    const { guess } = this.state
    const savedGuess = this.props.guess
    const donePlayers = players.filter(p => p.guess).map(p => p.name)
    const waitingOn = players.filter(p => !p.guess).map(p => p.name)

    return (
      <View style={styles.container}>
        <Text style={styles.h2}>Time to guess..</Text>
        <Text>Enter your best guess. When you are finished, click "submit".</Text>
        <View style={[styles.hex, { backgroundColor: hex }]} />

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={globalStyle.label}>Hex</Text>
            <TextInput
              id="hex"
              style={[globalStyle.input, styles.input]}
              onTextChange={guess => this.setState({ guess })}
              placeholder="eg. #ff00ab"
            />
          </View>
          {!savedGuess && (
            <Button title="Submit" style={{ marginRight: '0.5em' }} onPress={this.submit}>Submit</Button>
          )}
          {savedGuess && creator && (
            <Button title="Reveal" onPress={onReveal}>Reveal</Button>
          )}

          <View style={styles.activityContainer}>
            {!!donePlayers.length && (
              <View style={styles.activity}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={[styles.icon, styles.success]}>🌞</Text>
                  <Text style={styles.activityText}>
                    {donePlayers.join(', ')} {donePlayers.length === 1 ? 'has' : 'have'} submitted their guess{donePlayers.length !== 1 && 'es'}!
                  </Text>
                </View>
              </View>
            )}
            {!!waitingOn.length && (
              <View style={styles.activity}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={[styles.icon, styles.warn]}>🌝</Text>
                  <Text style={styles.activityText}>
                    Still waiting on&nbsp;
                    {waitingOn.join(', ')}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
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
  hex: {
    width: 280,
    height: 150,
    paddingBottom: 24,
    marginTop: 24,
    marginBottom: 24,
    borderRadius: globalStyle.borderRadius,
  },
  form: {
    marginTop: 24
  },
  formGroup: {
    marginBottom: 24
  },
  icon: {
    marginRight: 10
  },
  activityContainer: {
    marginTop: 24,
    marginBottom: 24
  },
  activity: {
    marginBottom: 8
  },
  activityText: {
    color: '#888'
  }
}
export default GameGuessing
