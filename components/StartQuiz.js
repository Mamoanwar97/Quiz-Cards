import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native'
import {connect} from 'react-redux'

var { height, width } = Dimensions.get('window');

function Quiz({navigation, route, decks}) {
  return (
    <View style={styles.container}>
      <View>
          <Text style={styles.title}>{route.params.deck? route.params.deck: "Deck name"}</Text>
          <Text style={styles.text}>{decks[route.params.deck]["questions"].length} Cards</Text>
      </View>
        <TouchableOpacity style={styles.button} 
          onPress={() => navigation.push('CardsDeck',{
          deck: route.params.deck,
          questions: route.params.questions
        })}>
            <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{backgroundColor:"#fff"}] } 
        onPress={() => navigation.push('New Card',{
          deck: route.params.deck
        })}>
            <Text style={[styles.buttonText, {color: "#000"}]}>Add Card</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
text:{
    fontSize: 18,
    marginTop: 5,
    color: "#111",
    alignSelf: "center"
},
title:{
   color: "#243871",
   fontSize:25,
   fontWeight: "bold",
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
export default connect(mapStateToProps)(Quiz);
