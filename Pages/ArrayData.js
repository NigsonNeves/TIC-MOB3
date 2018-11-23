import React from 'react';
import { Text, ScrollView, Button } from 'react-native';
import { StackNavigator} from 'react-navigation';
import Graph1Screen from '../Graphs/Graph1';


import Icon from 'react-native-vector-icons/FontAwesome';

class ArrayDataScreen extends React.Component {
    static navigationOptions = {
      title: 'Data',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <ScrollView>
          <Text>Array Data</Text>

          <Text> File Name : {this.props.navigation.state.params.filename}</Text>
          <Button name="area-chart" backgroundColor="#3b5998" title=" Moyenne par heure" onPress= { () =>navigate('Graph', { name: 'Graph' })}/>
          <Button name="area-chart" backgroundColor="#3b5998" title=" Humidity (%)" onPress= { () =>navigate('Graph1', { name: 'Graph' })}/>
        </ScrollView>
      )
    }
}

// export default ArrayDataScreen;

export default StackNavigator({
  ArrayData :{
    screen : ArrayDataScreen
  },
  Graph1 : {
    screen :   Graph1Screen
  }
})