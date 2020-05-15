import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import {connect} from 'react-redux'
import {new_deck, getData} from '../assets/actions'

var { height, width } = Dimensions.get('window');

function Item({ deck, navigation, questions }) {
  return (
    <TouchableOpacity style={styles.deck } 
      onPress={() => navigation.push('Challenge',{deck, questions})}>
      <Text style={styles.deckText}>{deck}</Text>
    </TouchableOpacity>
  );
}

class Home extends React.Component{
  
  componentDidMount() {
    this.props.dispatch(getData());
  }

  render() {
    
    const {navigation} = this.props;
  
  if(Object.keys(this.props.decks) == 0)
    return (
      <View style={styles.container}>
        <Text>Add new deck to start</Text>
      </View>
    );

  return (
    <View style={styles.container}>
        <FlatList
        data={Object.keys(this.props.decks)}
        renderItem={({ item }) => 
        <Item deck={item} 
        questions={this.props.decks[item]["questions"]} 
        navigation={navigation} />}
        keyExtractor={item => item.id}
        style={{flex:1}}
      />
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
  deck:{
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 7,
    height: 60,
    width: width*0.8,
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  deckText:{
    color: '#fff',
  },
});

function mapStateToProps (state) {
  return {
    decks : state
  }
}
export default  connect(mapStateToProps)(Home);

