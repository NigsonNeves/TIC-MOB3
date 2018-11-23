import React  from 'react';
import {createStackNavigator,createBottomTabNavigator, createMaterialTopTabNavigator,TabNavigator, StackNavigator} from 'react-navigation';
import { View, StatusBar, Title, Button, Left, Right, Body, Icon} from 'react-native';
import  {Header}  from 'react-native-elements';
import UploadScreen from './Pages/Upload.js';
import GraphScreen from './Pages/Graph.js';
import ArrayDataScreen from './Pages/ArrayData.js';
// import ListFilesScreen from './Pages/ListFiles.js';


const Tabs = TabNavigator({
  Upload: { screen: UploadScreen }, //Screens
  Graph: { screen: GraphScreen },
  // ListFiles: { screen: ListFilesScreen },
  },
  {
    tabBarPosition: "bottom",
    initialRouteName: 'Upload',
    tabBarOptions:{
      showIcon:true,
      pressColor:"#FF0245",
      style:{
        backgroundColor:"#a2273c",
        borderTopWidth:1,
        borderColor:"#3f101c"
      }
    }
  },
);

export default class App extends React.Component {

  render() {
    return (
      <View style={{flex:1}}>
       {/* <Header
          centerComponent={{ text: 'APP Meteo', style: { color: '#fff' } }}
        /> */}
        <StatusBar hidden={true}/>
        <Tabs/>
      </View>
    );
  }
}


// const App = createStackNavigator({
//   Upload: { screen: UploadScreen }, //Screens
//   Graph: { screen: GraphScreen },
//   ArrayData: { screen: ArrayDataScreen },
//   },
//   {
//     initialRouteName: 'Upload',
//   },
// );

// export default App;



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