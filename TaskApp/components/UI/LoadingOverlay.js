import { ActivityIndicator, View, StyleSheet } from "react-native";


function LoadingOverlay(){
    return <View style={styles.container}>
        <ActivityIndicator size="large" color="#2d0689"/>
    </View>
}

export default LoadingOverlay;

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white"

    }
});