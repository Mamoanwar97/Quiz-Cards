import React from 'react'
import {View, TextInput, StyleSheet, Text,
        TouchableOpacity, KeyboardAvoidingView, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {new_deck} from '../assets/actions'

var { height, width } = Dimensions.get('window');

class NewDeck extends React.Component{
  state={
    deck:""
  }

  render() {
    const {navigation} = this.props;
    const found = Object.keys(this.props.decks).find(e => e === this.state.deck)?
              true : false;
  return (
    <View style={styles.container}>
      
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View>
          <Text style={styles.title}>Enter Deck Name</Text>
      </View>
            <TextInput
                style={styles.input}
                placeholder="Add Here!"
                onChangeText={(deck) => this.setState({deck})}
                editable = {true}
                multiline = {true}
                placeholderTextColor= '#888'
                value ={this.state.deck}
            />
             {
            found? 
            <Text style={styles.warning}>This deck already exists</Text>
            :
            <Text style={styles.warning}></Text>
          }
            <TouchableOpacity style={styles.button} 
            onPress={() => {
              if(this.state.deck != "" && !found)
              {
                this.props.dispatch(new_deck(this.state.deck))
                navigation.navigate('Home');
                this.setState({
                  deck: ""
                })
              }
              }}>
                <Text style={styles.buttonText}>Add Challenge</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button,{backgroundColor:"#fff"}] } 
            onPress={() => {
              navigation.navigate('Home');
              }}>
                <Text style={[styles.buttonText, {color: "#000"}]}>Cancel</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
input: {
   marginTop: 10,
   borderColor: '#584871',
   borderWidth: 2,
   borderRadius: 8,
   paddingLeft: 10,
   paddingTop: 5,
   marginBottom: 8,
   color: '#111',
   fontSize: 14,
   height: 40,
      width: width * 0.7,

},
title:{
   color: "#243871",
   fontSize:25,
   fontWeight: "bold",
},
warning:{
   color: "#f00",
   fontSize:13
},
button:{
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 7,
    height: 40,
    width: width/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText:{
    color: '#fff',
  },
});

function mapStateToProps (state) {
  return {
    decks : state
  }
}

export default connect(mapStateToProps)(NewDeck);
