import React from 'react'
import {View, TextInput, StyleSheet, Text,
        TouchableOpacity, KeyboardAvoidingView, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {new_card} from '../assets/actions'

var { height, width } = Dimensions.get('window');

class NewCard extends React.Component{
  state={
    question:'',
    answer: '',
    condition: '',
  }

  render() {
    const {navigation, route} =this.props;
    const found = Object.values(this.props.decks[route.params.deck]['questions']).find(e => e["question"]=== this.state.question)?
              true : false;
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View>
          <Text style={styles.title}>{route.params.deck? route.params.deck: "Deck name"}</Text>
          </View>
            {
            found ? <Text style={styles.warning}>Same question exists</Text>
            :<Text style={styles.warning}></Text>
            }
            <TextInput
                style={styles.input}
                placeholder="What is your question?"
                onChangeText={(question) => this.setState({question})}
                editable = {true}
                multiline = {true}
                placeholderTextColor= '#888'
            />
            <TextInput
                style={[styles.input, {borderColor: "#9f3a86"}]}
                placeholder="What is your answer then ?"
                onChangeText={(answer) => this.setState({answer})}
                editable = {true}
                multiline = {true}
                placeholderTextColor= '#888'
            />
            <TextInput
                style={styles.input}
                placeholder="is it true or false"
                onChangeText={(condition) => this.setState({condition})}
                editable = {true}
                multiline = {true}
                placeholderTextColor= '#888'
            />
            {
            (this.state.condition != "true" && this.state.condition != "false" && this.state.condition !== '')? 
            <Text style={styles.warning}>Enter the conditon in a correct format</Text>
            :<Text style={styles.warning}></Text>
          }
            <TouchableOpacity style={styles.button}
            onPress={() => {
              if((this.state.answer && this.state.question  && (this.state.condition == "true" || this.state.condition == "false") && !found ))
              {
              this.props.dispatch(new_card(route.params.deck,{ question: this.state.question, answer: this.state.answer, condition: this.state.condition }));
              navigation.goBack();
              }
              }}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:"#fff"}] } 
            onPress={() => navigation.goBack()}>
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
warning:{
   color: "#f00",
   fontSize:13,
}
});

function mapStateToProps (state) {
  return {
    decks : state
  }
}

export default connect(mapStateToProps)(NewCard);
