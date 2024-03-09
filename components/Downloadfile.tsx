import RNFS from 'react-native-fs';

export const downloadFile = async (url:any,title:any) => {
    const filePath = RNFS.DocumentDirectoryPath + `/${title}`;

    const promise = RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: (res) => {
        // Handle download progress updates if needed
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
      },
    })
      .promise.then((response) => {
        console.log('File downloaded!', response);
      })
      .catch((err) => {
        console.log('Download error:', err);
      });
      return promise
  };

export const readFile = (setSubtitleSelectPaths:any) =>{
    const directoryPath = RNFS.DocumentDirectoryPath ;

    RNFS.readDir(directoryPath)
      .then(files => {
        setSubtitleSelectPaths(files.map((file) =>{return({label:file.name,value:file.path})}))
        
      })
      .catch(error => {
        console.log('Error reading directory:', error);
      });
}

export const getFileURI = async (filename:any) =>{
    const directoryPath = RNFS.DocumentDirectoryPath ;

    const files = await RNFS.readDir(directoryPath)
    const path = files.filter((file) =>{return(filename === file.name)})[0].path
    return path
}
export const deleteFiles = () =>{
  const directoryPath = RNFS.DocumentDirectoryPath ;

  const promise = RNFS.readDir(directoryPath)
    .then(files => {
      files.forEach( async (file) =>{await RNFS.unlink(file.path)})
     //  files.map((file) =>{return({label:file.name,value:file.path
      
    })
    .catch(error => {
      console.log('Error reading directory:', error);
    });
  return promise
}