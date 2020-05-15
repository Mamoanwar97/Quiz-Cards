import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FlipCard from 'react-native-flip-card'

var { height, width } = Dimensions.get('window');
  
export default function Card({question, answer}) {
  return (
    <View style={styles.container}>
    <View>
       <FlipCard style={styles.flip}
                  friction={6}
                  perspective={1000}
                  flipHorizontal={true}
                  flipVertical={false}
                  flip={false}
                  clickable={true}
                  onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
       >
        <View style={styles.card}>
          <Text style={styles.text}>{question}?</Text>
        </View>
        <View style={[styles.card, styles.flipCardBack]}>
          <Text  style={styles.text}>{answer}</Text>
        </View>
      </FlipCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flip:{
    marginTop:10
  },
  card: {
    padding: 10,
    width: width - 40,
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#584871',
    borderRadius: 10,
  },
  flipCardBack: {
    backgroundColor: "#9f3a86",
  },
 text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
