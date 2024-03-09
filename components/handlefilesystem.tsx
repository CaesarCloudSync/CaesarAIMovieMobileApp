import * as ScopedStorage from 'react-native-scoped-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function requestPermission(directoryId:any) {
    let dir = await ScopedStorage.openDocumentTree(true);
    if (!dir) return null; // User cancelled
    await AsyncStorage.setItem(directoryId, JSON.stringify(dir));
    return dir;
  }
  
  export async function getAndroidDir(directoryId:any) {
    try {
      let dir:any= await AsyncStorage.getItem(directoryId); // Check if dir exists already
      if (!dir) dir = await requestPermission(directoryId);
      // request new permissions & save the dir;
      else dir = JSON.parse(dir);
  
      const persistedUris = await ScopedStorage.getPersistedUriPermissions(); // list all persisted uris
      if (persistedUris.indexOf(dir.uri) !== -1) return dir; // Verify we still have permission
      return await requestPermission(directoryId); // request new permissions & save the dir;
    } catch (e) {
      console.log(e);
      return null;
    }
  }


export async function choosedirectory() { 

    const dir = await getAndroidDir('userDataDirectory')
    //console.log(dir)
    console.log(dir.uri)
    const files = await ScopedStorage.listFiles(dir.uri)
    return files
};