import React from 'react';
import { Alert } from 'react-native';
import { DocumentPicker, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class UploadScreen extends React.Component {
    static navigationOptions = {
      title: 'Select your file',
    };
  
    Upload = async (urlFile) => {
      let file_content = await FileSystem.readAsStringAsync(urlFile);
      let split_content = file_content.split('\n');
      let array_data = split_content[2].split('\t');
      let date = array_data[0].split(' ')[0];
      

      console.log(date)
      //let date = 
      console.log("Upload")
    }

    confirmAlert(fileName, urlFile){
      return Alert.alert(
        'Confirm file to upload',
        'File choosed: '+ fileName,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => this.Upload(urlFile)},
        ],
        { cancelable: false }
      )
    }

    getFile = async () => {
      try {
        let file = await DocumentPicker.getDocumentAsync(FileSystem.documentDirectory + '/Downloads');
        if(file){
          console.log('File choosed: ', file.name);
          this.confirmAlert(file.name, file.uri);
        }
        
        /*const content = file_content.split('\n');
        console.log('File content: ', content[3]);*/
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