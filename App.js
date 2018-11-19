import {createStackNavigator} from 'react-navigation';
import UploadScreen from './Pages/Upload.js';
import GraphScreen from './Pages/Graph.js';

const App = createStackNavigator({
  Upload: { screen: UploadScreen }, //Screens
  Graph: { screen: GraphScreen },
  },
  {
    initialRouteName: 'Upload',
  },
);

export default App;



/*import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>My Life suck !!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/