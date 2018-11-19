import React from 'react';
import { DocumentPicker, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class UploadScreen extends React.Component {
    static navigationOptions = {
      title: 'Select your file',
    };

    getFile = async () => {
      try {
        const file = await DocumentPicker.getDocumentAsync(FileSystem.documentDirectory + '/Downloads');
        if(file.exists){
          console.log('File choosed: ', file.name);
        }
        const file_content = await FileSystem.readAsStringAsync(file.uri);
        const content = file_content.split('\n');
        console.log('File content: ', content[3]);
      } catch (e) {
        console.error(e);
      }
    }

    render() {
      const { navigate } = this.props.navigation;
      const myButton = (
      <Icon.Button name="file-upload" backgroundColor="#3b5998" onPress= { this.getFile/*>() =>navigate('Graph', { name: 'Graph' })*/}>
          Upload file
      </Icon.Button>
      );
      return (
        myButton
      );
    }
  }

export default UploadScreen;