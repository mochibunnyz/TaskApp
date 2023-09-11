import { View, StyleSheet, Text, Alert, TextInput, Pressable, Platform, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";

//import Button from "../UI/Button";
import { getFormattedDate, toDateStringFunction, toStringFunction, toTimeSlice } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons,  Feather, MaterialIcons } from '@expo/vector-icons';



function TaskForm({submitButtonLabel,onCancel, onSubmit, defaultValues}){

    const [location,setLocation] = useState(defaultValues ? defaultValues.location: '');
    const [locationIsValid, setLocationIsValid] = useState(true);

    const [title,setTitle] = useState(defaultValues ?  defaultValues.title: '');
    const [titleIsValid, setTitleIsValid] = useState(true);


    const [date, setDate] = useState(defaultValues ? toStringFunction(defaultValues.date): "");
    const [showEndDate, setEndDate] = useState(defaultValues ? toDateStringFunction(defaultValues.date): "");
    const [showEndTime, setEndTime] = useState(defaultValues ? toTimeSlice(defaultValues.date): "");
    const [pickerDate, setPickerDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateIsValid, setDateIsValid] = useState(true);

    const [startDate, setStartDate] = useState(defaultValues ? toStringFunction(defaultValues.startDate): "");
    const [showStartDate, setShowStartDate] = useState(defaultValues ? toDateStringFunction(defaultValues.startDate): "");
    const [showStartTime, setShowStartTime] = useState(defaultValues ? toTimeSlice(defaultValues.startDate): "");
    const [pickerStartDate, setPickerStartDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [startDateIsValid, setStartDateIsValid] = useState(true);

    const [description, setDescription] = useState(defaultValues ? defaultValues.description: '');
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);

    const [pickerReminder, setPickerReminder] = useState(new Date());
    const [showReminderPicker, setShowReminderPicker] = useState(false);
    const [reminder, setReminder] = useState(defaultValues ? toStringFunction(defaultValues.reminder): "");
    const [reminderIsValid, setReminderIsValid] = useState(true);

    const [link, setLink] = useState(defaultValues ? defaultValues.link: '');

    const [subtasks, setSubtasks] = useState(defaultValues ? defaultValues.subtasks : []);
    

    
    
   
    

    const inputStyles=[styles.input];
    
    
    //to submit data
    function submitHandler(){
        const taskData ={
            location: location,
            title:title,
            date: new Date(date),
            startDate: new Date(startDate),
            reminder: new Date(reminder),
            link: link,
            description:description,
            subtasks:subtasks
        };

        //VALIDATION
        

        // Validate each field
        const titleIsValid = isTitleValid(taskData.title);
        const startDateIsValid = !isNaN(taskData.startDate);
        const dateIsValid = !isNaN(taskData.date);
        const reminderIsValid = !isNaN(taskData.reminder)  && isReminderValid(taskData.reminder);
        
        const allSubtasksValid = areAllSubtasksValid();
       
        
        

        // Update state variables
        setTitleIsValid(titleIsValid);
        setStartDateIsValid(startDateIsValid);
        setDateIsValid(dateIsValid);
        setReminderIsValid(reminderIsValid);

        // Check overall form validity
        const formIsValid = locationIsValid && titleIsValid && dateIsValid && reminderIsValid &&allSubtasksValid;
    
        

        //submit data 
        //onSubmit(taskData);
        if (formIsValid) {
            // Submit data
            onSubmit(taskData);
        }

        



    }

    //check whether title is valid
    function isTitleValid(title) {
        return title.trim().length > 0;
    }

    // Validation function to check if the reminder is at least 1 minutes later than the current time
    function isReminderValid(reminderDate) {
        const currentDateTime = new Date();
        const oneMinutesLater = new Date(currentDateTime.getTime() +  60 * 1000); // Add 2 minutes
    
        return reminderDate > oneMinutesLater;
    }
    //validation to check subtask title
    function isSubtaskValid(subtask) {
        return subtask.title.trim().length > 0;
    }

    // Define a function to check if all subtask titles are valid
    function areAllSubtasksValid() {
        for (const subtask of subtasks) {
            if (!isSubtaskValid(subtask)) {
                return false; // If any subtask is not valid, return false
            }
        }
        return true; // All subtasks are valid
    }
  

    //to togger the visibility of the startdatepicker
    const toggleStartDatepicker = () =>{
        setShowStartPicker(!showStartPicker);
    };

    //to togger the visibility of the datepicker
    const toggleDatepicker = () =>{
        setShowPicker(!showPicker);
    };
    //to togger the visibility of the reminder
    const toggleReminderpicker = () =>{
        setShowReminderPicker(!showReminderPicker);
    };

    //for changing picker date
    const onChangeStartDate =({type}, selectedDate) =>{
        if(type == "set"){
            const currentDate = selectedDate;
            setPickerStartDate(currentDate);
        }
        else{
            toggleStartDatepicker();
        }
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

    //for changing reminder date
    const onChangeReminder =({type}, selectedDate) =>{
        if(type == "set"){
            const currentReminderDate = selectedDate;
            setPickerReminder(currentReminderDate);
        }
        else{
            toggleReminderpicker();
        }
    };

    //to confirm the start date from the datepicker into date field and start date inputs
    const confirmStartDate =() =>{
        setStartDate(pickerStartDate.toString());
        setShowStartDate(pickerStartDate.toDateString());
        setShowStartTime(pickerStartDate.toLocaleTimeString());
        toggleStartDatepicker();
    }



    //to confirm the date from the datepicker into date textInput
    const confirmDate =() =>{
        setDate(pickerDate.toString());
        setEndDate(pickerDate.toDateString());
        setEndTime(pickerDate.toLocaleTimeString());
        toggleDatepicker();
    }
    //to confirm the date from the reminder picker into reminder textInput
    const confirmReminder =() =>{
        
        setReminder(pickerReminder.toString());
        toggleReminderpicker();
    }

    //for adding subtask
    const addSubtask = () => {
        const newSubtask = {
          title: '',
          completed: false,
        };
        setSubtasks([...subtasks, newSubtask]);
    };

    
    
    //for updating subtask
    const updateSubtaskDescription = (index, text) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index].title = text;

        
        setSubtasks(updatedSubtasks);
    };
      
    const deleteSubtask = (index) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks.splice(index, 1);
        setSubtasks(updatedSubtasks);
    };
      

    


   

    

    //view for the form
    //const formIsInvalid = !locationIsValid  ||!titleIsValid ||!dateIsValid|| !reminderIsValid; 
    return (
        <View style={styles.form}>
            
            {/* Title input */}
            <View style={styles.inputsRow}>
                <View style={[styles.inputContainer,styles.rowInput, ]}>
                    <Text style={[styles.label]}>Title</Text>
                    <TextInput 
                        style={[inputStyles]}
                        value={title}
                        onChangeText={setTitle}
                    />
                    {!titleIsValid && <Text style={styles.errorText}>Title is required</Text>}
                </View>

            </View>
        
            {/* Location input */}
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

            {/* for Start date  */}
            <View style={styles.inputsRow}>
                <View style={[styles.inputContainer,styles.rowInput]}>
                    <Text style={[styles.label]}>Start Date</Text>
                    {/* DatePicker */}
                    {showStartPicker && (
                        <DateTimePicker
                        mode="datetime"
                        display="spinner"
                        value={pickerStartDate}
                        onChange={onChangeStartDate}
                        style = {styles.datePicker}
                        textColor={GlobalStyles.colors.primary700}
                        />

                    )}
                    {/* buttons for DatePicker */}
                    {showStartPicker && Platform.OS === 'ios' &&(
                        <View 
                        style={[styles.pickerButtonContainer]}
                        >
                            <TouchableOpacity onPress= {toggleStartDatepicker} style={[styles.pickerButtons, styles.dateButton, styles.whiteButtons]}>
                                <Text style={styles.purpleText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {confirmStartDate} style={[styles.pickerButtons, styles.dateButton, styles.blueButtons]}>
                                <Text style= {{color:'white'}}>Confirm</Text>
                            </TouchableOpacity>


                        </View>

                    )}
                    {!showStartPicker && (
                        <Pressable
                            style={styles.dateContainer}
                            onPress={toggleStartDatepicker}
                        >
                            <TextInput
                                style={[styles.input, styles.dateInput]}
                                placeholder={pickerStartDate.toDateString()}
                                value= {showStartDate}
                                onChangeText={setShowStartDate}
                                editable={false}
                                onPressIn={toggleStartDatepicker}
                            />
                            <TextInput
                                style={[styles.input, styles.dateInput]}
                                placeholder={pickerStartDate.toLocaleTimeString()}
                                value= {showStartTime}
                                onChangeText={setShowStartTime}
                                editable={false}
                                onPressIn={toggleStartDatepicker}
                            />
                            
                        

                        </Pressable>
                        
                    )}
                    
                </View>

                
                
            </View>
            

            {/* for due date  */}
            <View style={styles.inputsRow}>
                <View style={[styles.inputContainer,styles.rowInput]}>
                    <Text style={[styles.label]}>End Date</Text>
                    {/* DatePicker */}
                    {showPicker && (
                        <DateTimePicker
                        mode="datetime"
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
                            style={styles.dateContainer}
                            onPress={toggleDatepicker}
                        >
                            <TextInput
                                style={[styles.input, styles.dateInput]}
                                placeholder={pickerDate.toDateString()}
                                value= {showEndDate}
                                onChangeText={setEndDate}
                                editable={false}
                                onPressIn={toggleDatepicker}
                            />
                            <TextInput
                                style={[styles.input, styles.dateInput]}
                                placeholder={pickerDate.toLocaleTimeString()}
                                value= {showEndTime}
                                onChangeText={setEndTime}
                                editable={false}
                                onPressIn={toggleDatepicker}
                            />
                        

                        </Pressable>
                    )}
                    
                </View>

                
                
            </View>
            
            {/* for  link  */}
            <View style={styles.inputsRow}>
                <View style={[styles.inputContainer,styles.rowInput]}>
                    <Text style={[styles.label]}>Link</Text>
                    <TextInput 
                        style={[inputStyles]}
                        value={link}
                        onChangeText={setLink}
                        placeholder="Link"
                    />
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
                    placeholder="Notes"
                />
            </View>
            
            
            {/* Add subtask */}
            <View style={styles.inputsRow}>
                <View style={[styles.inputContainer,styles.rowInput, ]}>
                    <View style={styles.addSubtaskContainer}>
                        <Text style={[styles.label]}>SubTasks</Text>
                        <TouchableOpacity onPress={addSubtask}>
                            <Ionicons name="add-circle-outline" size={24} color={GlobalStyles.colors.primary700}/>
                        </TouchableOpacity>
                    </View>
                    
                        {subtasks && subtasks.map((subtask, index) => (
                            <View key={index} style={styles.addSubtaskContainer}>
                                <TextInput
                                value={subtask.title}
                                style={[inputStyles]}
                                onChangeText={(text) => updateSubtaskDescription(index, text)}
                                placeholder="Enter subtask                     "
                                />
                                {/* Add more fields or controls for subtasks here */}
                                <TouchableOpacity onPress={() => deleteSubtask(index)}>
                                <MaterialIcons name="delete-forever" size={24} color={GlobalStyles.colors.primary700} marginTop ={5} />
                                </TouchableOpacity>
                                {!isSubtaskValid(subtask) && (
                                    <Text style={styles.errorText}>title is required</Text>
                                )}
                            </View>
                        ))}
                    
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
                                placeholder={pickerReminder.toString()}
                                value= {reminder}
                                onChangeText={setReminder}
                                editable={false}
                                onPressIn={toggleReminderpicker}
                            />
                        

                        </Pressable>
                    )}
                    
                </View>

                
                
            </View>

            

            
         
            {/* validation message */}
            
            
            {!startDateIsValid  && <Text style={styles.errorText}>Please select a valid start date</Text>}
            {!dateIsValid && <Text style={styles.errorText}>Please select a valid end date</Text>}
            {!reminderIsValid && <Text style={styles.errorText}>Please select a valid reminder date or please make sure the reminder time is at least 1 min after the current time.</Text>}
            {/* Error message for subtasks */}
            
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
    dateContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dateInput:{
        minWidth:150
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:50,
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
    invalidInput:{
        backgroundColor:GlobalStyles.colors.error50,
        
    },
    validInput:{
        backgroundColor:GlobalStyles.colors.primary100,
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

    addSubtaskContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical:5
       
    },
    
})
