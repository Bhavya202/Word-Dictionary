import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

class PhonicSoundButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressButtonIndex: '',
    };
  }

  playSound = async (soundChunk) => {
    console.log(soundChunk);
    var soundLink =
      'https://s3-whitehatjrcontent.whjr.online/phones/' + soundChunk + '.mp3';

    await Audio.Sound.createAsync({ uri: soundLink }, { shouldPlay: true });
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ pressButtonIndex: this.props.buttonIndex });
          this.playSound(this.props.soundChunk);
        }}>
        <Text
          style={
            this.props.buttonIndex === this.state.pressButtonIndex
              ? [styles.displayText,
                  { background:
                    'linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)'
                  }
                ]
              : [styles.displayText,
                  { background:
                    'linear-gradient(to right, #a8ff78, #78ffd6)' 
                  }
                ]
          }>
          {this.props.wordChunk}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  displayText: {
    color: 'black',
    marginTop: 35,
    marginBottom: 5,
    width: '40%',
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
    fontWeight: 600,
    fontStyle: 'italic',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default PhonicSoundButton;
