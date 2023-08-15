import { View, StyleSheet, Text, Alert, TextInput, Pressable, Platform, TouchableOpacity, Button } from "react-native";
import Input from "./Input";
import { useState } from "react";
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';


//import Button from "../UI/Button";
import { getFormattedDate, toDateStringFunction, toStringFunction } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import DateTimePicker from '@react-native-community/datetimepicker';


function TaskForm({submitButtonLabel,onCancel, onSubmit, defaultValues}){

    const [pickerDate, setPickerDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [location,setLocation] = useState(defaultValues ? defaultValues.location: '');
    const [locationIsValid, setLocationIsValid] = useState(true);

    const [title,setTitle] = useState(defaultValues ?  defaultValues.title: '');
    const [titleIsValid, setTitleIsValid] = useState(true);


    const [date, setDate] = useState(defaultValues ? toDateStringFunction(defaultValues.date): "");
    const [dateIsValid, setDateIsValid] = useState(true);

    const [description, setDescription] = useState(defaultValues ? defaultValues.description: '');
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);

    const [pickerReminder, setPickerReminder] = useState(new Date());
    const [showReminderPicker, setShowReminderPicker] = useState(false);
    const [reminder, setReminder] = useState(defaultValues ? toStringFunction(defaultValues.reminder): "");
    //const [reminder, setReminder] = useState("");

    const inputStyles=[styles.input];
    
    
    //to submit data
    function submitHandler(){
        const taskData ={
            location: location,
            title:title,
            date: new Date(date),
            reminder: new Date(reminder),
            description:description
        };

        //VALIDATION
        
        const locationIsValid =taskData.location.trim().length >0;
        const titleIsValid = taskData.title.trim().length >0;
        const dateIsValid = taskData.date.toString() !== 'Invalid Date';
        //trim() remove all the white spaces
        const descriptionIsValid = taskData.description.trim().length >0;

        // if(!locationIsValid  || !titleIsValid|| !dateIsValid || !descriptionIsValid){

        //     //show feedback
        //     setInputs((curInputs)=>{
        //         return{
        //             location:{value:curInputs.location.value, isValid:locationIsValid},
        //             title:{value:curInputs.title.value, isValid:titleIsValid},
        //             date:{value:curInputs.date.value, isValid:dateIsValid},
        //             description:{value:curInputs.description.value, isValid:descriptionIsValid},
        //         };
        //     });
        //     //return to stop the submition
        //     return;
        // }

        onSubmit(taskData);

    }

    //to togger the visibility of the datepicker
    const toggleDatepicker = () =>{
        setShowPicker(!showPicker);
    };

    const toggleReminderpicker = () =>{
        setShowReminderPicker(!showReminderPicker);
    };

    //for changing picker date
    const onChange =({type}, selectedDate) =>{
        if(type == "set"){
            const currentDate = selectedDate;
            setPickerDate(currentDate);
        }
        else{
            toggleDatepicker();
        }
    };

    const onChangeReminder =({type}, selectedDate) =>{
        if(type == "set"){
            const currentReminderDate = selectedDate;
            setPickerReminder(currentReminderDate);
        }
        else{
            toggleReminderpicker();
        }
    };



    //to confirm the date from the datepicker into date textInput
    const confirmDate =() =>{
        setDate(pickerDate.toDateString());
        toggleDatepicker();
    }

    const confirmReminder =() =>{
        
        setReminder(pickerReminder.toString());
        toggleReminderpicker();
    }

   
    Notifications.setNotificationHandler({
        handleNotification: async () => {
        return {
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowAlert: true,
        };
        },
    });
      
    //// (NEED FOR IOS CUZ IOS NEED PERMISSION////
    const allowsNotificationsAsync = async () => {
        const settings = await Notifications.getPermissionsAsync();
        return (
        settings.granted ||
        settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
        );
    };
   
    const requestPermissionsAsync = async () => {
        return await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
        },
        });
    };
    //// END ////
    

    useEffect(()=>{
        const subscription1 = Notifications.addNotificationReceivedListener((notification)=> {
          console.log('NOTIFICATION RECEIVED');
          console.log(notification);
          // extract the username data
          const userName = notification.request.content.data.userName;
          
        });
    
        //user response by tapping on the notification
        const subscription2 = Notifications.addNotificationResponseReceivedListener((response)=> {
          console.log('NOTIFICATION RESPONSE RECEIVED');
          console.log(response);
          
          
          
        });
    
        return () =>{
          subscription1.remove();
          subscription2.remove();
        };
        
      },[]
    );
    //// Set Schedule Notification and its content///
    const scheduleNotificationHandler = async () =>{
        //// START: CALL FUNCTIONS HERE ////
        const hasPushNotificationPermissionGranted =
        await allowsNotificationsAsync();


        if (!hasPushNotificationPermissionGranted) {
            await requestPermissionsAsync();
        }
        //// END: CALL FUNCTIONS HERE ////

        Notifications.scheduleNotificationAsync({
            content: {
              title: "My first local notification",
              body: "This is the body of the notification.",
              data: { userName: "Max" },
            },
            trigger: {
              seconds: 2,
            },
        });
    }
    

    

    //view for the form
    const formIsInvalid = !locationIsValid  ||!titleIsValid ||!dateIsValid|| !descriptionIsValid; 
    return (
        <View style={styles.form}>
            
            {/* for  title  */}
            <View style={styles.inputsRow}>
                <View style={[styles.inputContainer,styles.rowInput]}>
                    <Text style={[styles.label]}>Title</Text>
                    <TextInput 
                        style={inputStyles}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

            </View>
            <View style={styles.inputsRow}>
                <View style={[styles.inputContainer,styles.rowInput]}>
                    <Text style={[styles.label]}>Location</Text>
                    <TextInput 
                        style={inputStyles}
                        value={location}
                        onChangeText={setLocation}
                    />
                </View>

            </View>
            
   
            {/* for due date  */}
            <View style={styles.inputsRow}>
                <View style={[styles.inputContainer,styles.rowInput]}>
                    <Text style={[styles.label]}>Due Date</Text>
                    {/* DatePicker */}
                    {showPicker && (
                        <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={pickerDate}
                        onChange={onChange}
                        style = {styles.datePicker}
                        textColor={GlobalStyles.colors.primary700}
                        />

                    )}
                    {/* buttons for DatePicker */}
                    {showPicker && Platform.OS === 'ios' &&(
                        <View 
                        style={[styles.pickerButtonContainer]}
                        >
                            <TouchableOpacity onPress= {toggleDatepicker} style={[styles.pickerButtons, styles.dateButton, styles.whiteButtons]}>
                                <Text style={styles.purpleText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {confirmDate} style={[styles.pickerButtons, styles.dateButton, styles.blueButtons]}>
                                <Text style= {{color:'white'}}>Confirm</Text>
                            </TouchableOpacity>


                        </View>

                    )}
                    {!showPicker && (
                        <Pressable
                            onPress={toggleDatepicker}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder="Mon Aug 14 2023"
                                value= {date}
                                onChangeText={setDate}
                                editable={false}
                                onPressIn={toggleDatepicker}
                            />
                        

                        </Pressable>
                    )}
                    
                </View>

                
                
            </View>

            {/* input text for reminder */}
            <View style={styles.inputsRow}>
                <View style={[styles.inputContainer,styles.rowInput]}>
                    <Text style={[styles.label]}>Reminder</Text>
                    {/* DateTimePicker */}
                    {showReminderPicker && (
                        <DateTimePicker
                        mode="datetime"
                        display="spinner"
                        value={pickerReminder}
                        onChange={onChangeReminder}
                        style = {styles.datePicker}
                        textColor={GlobalStyles.colors.primary700}
                        />

                    )}
                    {/* buttons for DatePicker */}
                    {showReminderPicker && Platform.OS === 'ios' &&(
                        <View 
                        style={[styles.pickerButtonContainer]}
                        >
                            <TouchableOpacity onPress= {toggleReminderpicker} style={[styles.pickerButtons, styles.dateButton, styles.whiteButtons]}>
                                <Text style={styles.purpleText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {confirmReminder} style={[styles.pickerButtons, styles.dateButton, styles.blueButtons]}>
                                <Text style= {{color:'white'}}>Confirm</Text>
                            </TouchableOpacity>


                        </View>

                    )}
                    {!showReminderPicker && (
                        <Pressable
                            onPress={toggleReminderpicker}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder="Mon Aug 14 2023"
                                value= {reminder}
                                onChangeText={setReminder}
                                editable={false}
                                onPressIn={toggleReminderpicker}
                            />
                        

                        </Pressable>
                    )}
                    
                </View>

                
                
            </View>

            {/* input text for descriptions */}
            <View style={[styles.inputContainer,styles.rowInput]}>
                <Text style={[styles.label]}>Description</Text>
                <TextInput 
                    style={[styles.input, styles.inputMultiline]}
                    value={description}
                    onChangeText={setDescription}
                    multiline= {true}
                />
            </View>
            {/* <Button
            title='Schedule Notification'
            onPress={scheduleNotificationHandler}
            /> */}

            

            {/* input text for descriptions */}
            <View style={[styles.inputContainer,styles.rowInput]}>
                <Text style={[styles.label]}>Description</Text>
                <TextInput 
                    style={[styles.input, styles.inputMultiline]}
                    value={description}
                    onChangeText={setDescription}
                    multiline= {true}
                />
            </View>
            
            

            {/* validation message */}
            {formIsInvalid && (<Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>)}

            <View style = {styles.buttons}>
                <TouchableOpacity style = {[styles.button,styles.whiteButtons]}  onPress={onCancel}>
                    <Text style= {styles.purpleText}>Cancel</Text>
                </TouchableOpacity >
                {/* if the page is in editing mode, show update, else show add */}
                <TouchableOpacity  style = {[styles.button, styles.blueButtons]} onPress={submitHandler}>
                    <Text style= {{color:'white'}}>{submitButtonLabel}</Text>
                </TouchableOpacity >
            </View>

        </View>
    );
}

export default TaskForm;

const styles = StyleSheet.create({
    form:{
        marginTop:40
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'black',
        marginVertical:24,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:200,
    },
    button:{
        minWidth:120,
        minHeight:50,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30
    },
    blueButtons:{
        backgroundColor:GlobalStyles.colors.primary700,
        
    },
    whiteButtons:{
        borderColor:GlobalStyles.colors.primary700,
        borderWidth:1,
    },
    purpleText:{
        color:GlobalStyles.colors.primary700,
    },

    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInput:{
        flex:1
    },
    errorText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        color:'black',
        padding:6,
        borderRadius:6,
        fontSize:15
    },
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8,
        
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top',
        marginTop:10,
    },
    label:{
        fontSize:16,
        color:GlobalStyles.colors.primary700,
        marginBottom:4
    },
    
    datePicker:{
        height:120,
        margin:-10,
        
    },
    dateButton:{
        paddingHorizontal:20,
    },
    pickerButtonContainer:{
        flexDirection:'row', 
        justifyContent:'space-around',
    },
    pickerButtons:{
        minWidth:80,
        minHeight:30,
        marginTop:10,
        marginHorizontal:8,
        backgroundColor:'white',
        borderRadius:20,
        justifyContent:'center'
    },
    pickerText:{
        fontSize:10
    },
    
})