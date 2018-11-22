import React from 'react';
import { Alert, Text, ScrollView } from 'react-native';
import { DocumentPicker, FileSystem , SQLite} from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class UploadScreen extends React.Component {
    static navigationOptions = {
      title: 'Select your file',
    };

    state =  {
      directoryFiles : []
    }

    filesList = () => {
      if (this.state.directoryFiles.length === 0){
        return (
            <Text>There's no files</Text>
        );
      }

      return (
        this.state.directoryFiles.map((file, i) => (
          <Text key={i} > {file} </Text>
          ))
        );
    };

    deleteAlert(nameFile){
      Alert.alert(
        'Are you sure you want to delete this file',
        'File name: ' + nameFile,
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.deleteFile(nameFile)},
        ],
      )
    }

    deleteFile = async (nameFile) => {
      let existingFile = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'meteo_uploaded_files/' + nameFile);

      if(existingFile.exists){
        await FileSystem.deleteAsync(FileSystem.documentDirectory + 'meteo_uploaded_files/' + nameFile)
      }else{
        Alert.alert(
          'Failed',
          nameFile + ' doesn\'t exist',
          [
            {text: 'OK'},
          ],
        )
      }

    }

    Upload = async (urlFile, nameFile) => {
      let file_content = await FileSystem.readAsStringAsync(urlFile);
      let split_content = file_content.split('\n');
      let array_data = split_content[2].split('\t');
      let date = array_data[0].split(' ')[0];
      let uploaded_content = file_content.replace(/\s/g,';');
      let checkDirectory = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'meteo_uploaded_files');
      let test = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'meteo_uploaded_files');
      //var results = await Papa.parse(uploaded_content);
      console.log(test)
      if(checkDirectory.isDirectory){
        let existingFile = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'meteo_uploaded_files/' + date);
        if(!existingFile.exists){
          await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'meteo_uploaded_files/' + date, uploaded_content);
          this.setState({
            directoryFiles : [...this.state.directoryFiles, date]
          })
          Alert.alert(
            'Success',
            nameFile + ' successfully uploaded',
            [
              {text: 'OK'},
            ],
          )
        }
      }else{
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'meteo_uploaded_files');
        await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'meteo_uploaded_files/' + date, uploaded_content);
        let test = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'meteo_uploaded_files');
        console.log(test)
        this.setState({
          directoryFiles : [...this.state.directoryFiles, date]
        })
        Alert.alert(
          'Success',
          nameFile + ' successfully uploaded',
          [
            {text: 'OK'},
          ],
        )
      }
    }

    getFile = async () => {
      try {
        let file = await DocumentPicker.getDocumentAsync(FileSystem.documentDirectory + '/Downloads');
        this.Upload(file.uri, file.name)
      } catch (e) {
        console.error(e);
      }
    }

    render() {
      const { navigate } = this.props.navigation;
      return (
      <ScrollView>
        <Icon.Button name="file-upload" backgroundColor="#3b5998" onPress= { this.getFile/*>() =>navigate('Graph', { name: 'Graph' })*/}></Icon.Button>
        {this.filesList()} 
      </ScrollView>
      );
    }
  }

export default UploadScreen;