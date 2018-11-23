import React from 'react';
import { Text, ScrollView } from 'react-native';
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
          <Icon.Button name="area-chart" backgroundColor="#3b5998" onPress= { () =>navigate('Graph', { name: 'Graph' })}></Icon.Button>
        </ScrollView>
      )
    }
}

export default ArrayDataScreen;