import { View, StyleSheet, Text, Alert, TextInput, Pressable, Platform, TouchableOpacity } from "react-native";
import Input from "./Input";
import { useState } from "react";

import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import DateTimePicker from '@react-native-community/datetimepicker';


function TaskForm({submitButtonLabel,onCancel, onSubmit, defaultValues}){

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [inputs, setInputs]= useState({
        location:{
            value:defaultValues ? defaultValues.location: '',
            // isValid: defaultValues ? true:false,
            //isValid: !!defaultValues,
            isValid: true,
        },
        // date:defaultValues ? defaultValues.date.toISOString().slice(0,10): '',
        title:{
            value: defaultValues ?  defaultValues.title: '',
            isValid: true,
        },
        date:{
            value: defaultValues ? getFormattedDate(defaultValues.date): '',
            isValid: true,
        },
        description:{
            value: defaultValues ? defaultValues.description: '',
            isValid: true,
        },
    });
    function inputChangedHandler(inputIdentifier, enteredValue){
        setInputs((curInputs=>{
            return {
                ...curInputs,
                [inputIdentifier]:{value: enteredValue, isValid:true},
            };
        }));
    }

    function submitHandler(){
        const taskData ={
            location: inputs.location.value,
            title:inputs.title.value,
            date: new Date(inputs.date.value),
            description:inputs.description.value
        };

        //VALIDATION
        
        const locationIsValid =taskData.location.trim().length >0;
        const titleIsValid = taskData.title.trim().length >0;
        const dateIsValid = taskData.date.toString() !== 'Invalid Date';
        //trim() remove all the white spaces
        const descriptionIsValid = taskData.description.trim().length >0;

        if(!locationIsValid  || !titleIsValid|| !dateIsValid || !descriptionIsValid){

            //show feedback
            setInputs((curInputs)=>{
                return{
                    location:{value:curInputs.location.value, isValid:locationIsValid},
                    title:{value:curInputs.title.value, isValid:titleIsValid},
                    date:{value:curInputs.date.value, isValid:dateIsValid},
                    description:{value:curInputs.description.value, isValid:descriptionIsValid},
                };
            });
            //return to stop the submition
            return;
        }

        onSubmit(taskData);

    }
    const toggleDatepicker = () =>{
        setShowPicker(!showPicker);
    };

    const onChange =({type}, selectedDate) =>{
        if(type == "set"){
            const currentDate = selectedDate;
            setDate(currentDate);
        }
        else{
            toggleDatepicker();
        }
    };

    const confirmDate =() =>{
        inputChangedHandler.bind(this, 'date')
    }

    //view for the form
    const formIsInvalid = !inputs.location.isValid  ||!inputs.title.isValid ||!inputs.date.isValid || !inputs.description.isValid; 
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Task</Text>
            <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput} 
                    label="Title" 
                    invalid={!inputs.title.isValid}
                    textInputConfig=
                {{
                   
                    onChangeText:inputChangedHandler.bind(this, 'title'),
                    value: inputs.title.value,
                }}/>

            </View>
            <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput} 
                    label="location" 
                    invalid={!inputs.location.isValid}
                    textInputConfig=
                {{
                    onChangeText:inputChangedHandler.bind(this, 'location'),
                    value: inputs.location.value,
                }}/>
                
                {/* <Input  
                    style={styles.rowInput}  
                    label="Due Date" 
                    invalid={!inputs.date.isValid}
                    textInputConfig=
                {{
                    placeholder:'YYYY-MM-DD',
                    maxLength:10,
                    onChangeText:inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value,
                }}/> */}

            </View>

                
                   
            <View>

                {/* DatePicker */}
                {showPicker && (
                    <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange}
                    style = {styles.datePicker}
                    />

                )}
                {/* buttons for DatePicker */}
                {showPicker && Platform.OS === 'ios' &&(
                    <View 
                    style={{flexDirection:'row', justifyContent:'space-around'}}
                    >
                        <TouchableOpacity style={[styles.button, styles.dateButton]}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.dateButton]}>
                            <Text>Confirm</Text>
                        </TouchableOpacity>


                    </View>

                )}
                
                
                
                {!showPicker && (
                    <Pressable
                        onPress={toggleDatepicker}
                    >
                        <TextInput
                        style={styles.input}
                        placeholder="2023-08-07"
                        value= {inputs.date.value}
                        onChangeText={inputChangedHandler.bind(this, 'date')}
                        editable={false}
                        onPressIn={toggleDatepicker}
                    
                        />

                        {/* <Input  
                            
                            label="Due Date" 
                            invalid={!inputs.date.isValid}
                            onPressIn={toggleDatepicker}
                            textInputConfig=
                            {{
                                placeholder:'2023-08-07',
                                maxLength:10,
                                onChangeText:inputChangedHandler.bind(this, 'date'),
                                value: inputs.date.value,
                                editable: false,
                                
                            }}
                        /> */}


                    </Pressable>
                )}
                

            </View>
            
            <Input 
                label= "Description" 
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    //autocorrect:false//default is false
                    //autoCapitalize: 'none'
                    onChangeText:inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value,
                }}
            />

            {/* validation message */}
            {formIsInvalid && (<Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>)}

            <View style = {styles.buttons}>
                <Button style = {styles.button} mode = 'flat' onPress={onCancel}>Cancel</Button>
                {/* if the page is in editing mode, show update, else show add */}
                <Button style = {styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
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
        color:'white',
        marginVertical:24,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        minWidth:120,
        marginHorizontal:8
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
        color:GlobalStyles.colors.primary700,
        padding:6,
        borderRadius:6,
        fontSize:18
    },
    datePicker:{
        height:120,
        margin:-10
    },
    dateButton:{
        paddingHorizontal:20,
    },
    
})