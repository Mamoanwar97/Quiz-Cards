import * as React from 'react';
import Card from './Card'
import { Text, View, StyleSheet,Dimensions, TouchableOpacity} from 'react-native';
import { Entypo,MaterialIcons } from '@expo/vector-icons'; 
import { connect } from "react-redux"

var { height, width } = Dimensions.get('window');

class CardDeck extends  React.Component{

  state ={
    questions: this.props.decks[this.props.route.params.deck]["questions"],
    score: 0,
    index: 0,
  }


  render() {
  
  const {route, navigation, decks} = this.props;

  if(!this.state.questions.length)
  {
    return (
      <View style={styles.container}>
        <MaterialIcons name="error" size={50} color="black" />
        <Text>You have 0 Cards in this deck</Text>
      </View>
    );
  }
   if(this.state.index === this.state.questions.length)
  {
    return (
      <View style={styles.container}>
        <MaterialIcons name="done" size={50} color="black" />
        <Text>Your Score is {this.state.score}/{this.state.questions.length}</Text>
        <TouchableOpacity  style={[styles.reset, styles.button]}
        onPress={() => this.setState({
          index: 0,
          score: 0
        })}>
          <Entypo name="back-in-time" size={25} color="black" />
        </TouchableOpacity>
    </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.buttons, {marginBottom: 5, justifyContent: "space-between"}]}>
          <View>
            <Text style={[styles.submit]}>
            {route.params.deck? route.params.deck: "Deck name"}
            </Text>
          </View>
          <View>
            <Text style={styles.submit}>{this.state.score}/{this.state.questions.length}</Text>
          </View>
        </View>
        <Card question={this.state.questions[this.state.index].question} answer={this.state.questions[this.state.index].answer}/>
        <View style={styles.buttons}>
          <TouchableOpacity  style={[styles.correctButton, styles.button]}
            onPress={() => {
              this.setState((prev)=>({
                index: prev.index+1,
                score: (this.state.questions[this.state.index].condition === "true")? prev.score+1: prev.score
              }))
            }}
          >
            <Text style={[styles.text, {fontSize: 18}]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.wrongButton, styles.button]}
          onPress={() => {
              this.setState((prev)=>({
                index: prev.index+1,
                score: (this.state.questions[this.state.index].condition === "false")? prev.score+1: prev.score
              }))
            }}>
              <Text style={[styles.text, {fontSize: 18}]}>Wrong</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity  style={[styles.reset, styles.button]}
        onPress={() => this.setState({
          index: 0,
          score: 0
        })}>
          <Entypo name="back-in-time" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 },
 text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttons:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  button:{
    padding: 10,
    borderRadius: 7,
    height: 40,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctButton:{
    backgroundColor: '#266218',
  },
  wrongButton:{
    backgroundColor: '#820004',
  },
  submit:{
     color: "#243871",
     fontSize:25,
     fontWeight: "bold"
  }
  ,
  reset:{
    backgroundColor: '#fff',
    marginTop: 10,
    borderColor: "#000",
    borderWidth: 1,
    alignSelf: "center"
  }
});

function mapStateToProps (state) {
  return {
    decks : state
  }
}
export default connect(mapStateToProps)(CardDeck);
