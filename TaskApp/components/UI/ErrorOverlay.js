import { Text, View, StyleSheet, TouchableOpacity } from "react-native";


function ErrorOverlay({message}){
    return <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An error occurred!</Text>
        <Text style={styles.text}>{message}</Text>
        
    </View>
}

export default ErrorOverlay;

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'

    },
    text:{
        color:'black',
        textAlign:'center',
        marginBottom:8,
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    
});