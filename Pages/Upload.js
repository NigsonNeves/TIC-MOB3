import React from 'react';
import { Alert, Text, ScrollView, FlatList, StyleSheet, View } from 'react-native';
import { DocumentPicker, FileSystem , SQLite} from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class UploadScreen extends React.Component {
    static navigationOptions = {
      title: 'Select your file',
    };

    state =  {
      directoryFiles : []
    }

    checkState = async () => {
      let files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'meteo_uploaded_files');

      //Permet d'afficher les fichier sur la page d'upload
       if(files){ 
        if(files.length != 0){ 
          for(let i = 0; i < files.length; i++){
            this.setState({
              directoryFiles : [...this.state.directoryFiles, files[i]]
            })
          }
        }
       }
    }

    componentDidMount() {
      this.checkState()
    }

    removeItem = (index) => {
      const file = this.state.directoryFiles;
      this.setState({ 
        directoryFiles: [...file.slice(0,index), ...file.slice(index+1)]
      });
    }

    filesList = () => {
      const { navigate } = this.props.navigation;
      
      if (this.state.directoryFiles.length === 0){
        return (
            <Text>There's no files</Text>
        );
      }

      
      return (
        this.state.directoryFiles.map((file, i) => (
        <Text key={i} onPress= {() =>navigate('ArrayData', { name: 'ArrayData' })} > {file} </Text>
        /*<View style={styles.container}>
          <FlatList
            data={[
              {key: file},
            ]}
            renderItem={({item}) => <Text style={styles.item} onPress={this.deleteAlert(file)} >{item.key}</Text>}/>
        </View>*/
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
        this.removeItem(nameFile)
        Alert.alert(
          'Success',
          nameFile + ' successfully deleted',
        )
      }else{
        Alert.alert(
          'Failed',
          nameFile + ' doesn\'t exist',
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
          )
        }else{
          Alert.alert(
            'Failed',
            nameFile + ' already uploaded',
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
      return (
      <ScrollView>
        <Icon.Button name="file-upload" backgroundColor="#3b5998" onPress= { this.getFile}></Icon.Button>
        {this.filesList()}
      </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })

export default UploadScreen;