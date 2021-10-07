import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PhonicSoundButton from './components/PhonicSoundButton';
import db from './localDb';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }

  render() {
    return (
      <SafeAreaProvider style={styles.container}>
        <Text style={styles.appText}>Munky Chunky App</Text>
        <Image style={styles.imageIcon} source={require('./assets/icon.png')} />
        <TextInput
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          placeholder="Search Word..."
          style={styles.inputBox}
          value={this.state.text}
        />

        <TouchableOpacity
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();
            db[word]?(
              this.setState({ chunks: db[word].chunks }),
              this.setState({ phonicSounds: db[word].phones })
              ):( word === ''
                ? alert("Please Enter A Word!")
                : alert("The Word Isn't Available For Now!")
              )
          }}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.chunkBtn}>
          Chunks:
          {this.state.chunks.map((index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}>
              </PhonicSoundButton>
            );
          })}
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    background: 'linear-gradient(to right, #56ccf2, #2f80ed)',
  },
  appText: {
    background: 'linear-gradient(to right, #aaffa9, #11ffbd)',
    color: 'white',
    marginTop: 25,
    width: '100%',
    height: 70,
    borderWidth: 3,
    borderRadius: 5,
    padding: 20,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    cursor: 'none',
  },
  inputBox: {
    background: 'linear-gradient(to right, #c9d6ff, #e2e2e2)',
    marginTop: 25,
    width: '80%',
    height: 60,
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 25,
    fontStyle: 'italic',
  },
  btnText: {
    marginTop: 25,
    marginBottom: 35,
    padding: 10,
    width: '45%',
    border: '2px solid',
    borderRadius: 5,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  chunkBtn: {
    background: 'linear-gradient(to right, #ff5f6d, #ffc371)',
    backgroundSize: 'contain',
    color: 'white',
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 7.5,
    width: '90%',
    paddingVertical: 30,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 600,
    fontStyle: 'italic',
    flexDirection: 'row'
  },
  imageIcon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 25,
    cursor: 'none',
  },
});
