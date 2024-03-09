import SelectDropdown from 'react-native-select-dropdown'
import { View } from 'react-native'
import { getFileURI } from './Downloadfile'
export const Dropdown = ({data,setSubtitleName,setSubtitlePath,style}:any) =>{
    return(
        <View style={style}>
            <SelectDropdown
        defaultButtonText='Select'
        buttonStyle={{width:350,height:30,borderRadius:5,backgroundColor:"blue"}}
        buttonTextStyle={{textAlign:"left",color:"white",fontSize:15}}
        dropdownStyle={{borderRadius:5,backgroundColor:"#222222"}}
        rowTextStyle={{color:"white"}}

        

 
    
	data={data}
	onSelect={async (selectedItem, index) => {
        const path = await getFileURI(selectedItem)
        setSubtitlePath(path)

        setSubtitleName(selectedItem)

	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
        </View>
        
    )
}