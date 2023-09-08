import axios from 'axios';

const BACKEND_URL ='https://busybuddy-ec661-default-rtdb.asia-southeast1.firebasedatabase.app'

export async function storeTask(taskData){
    const response = await axios.post(BACKEND_URL + '/tasks.json',taskData);
    const id = response.data.name;
    return id;
}

export async function fetchTask(){
    const response = await axios.get(BACKEND_URL + '/tasks.json');
    const tasks = [];
    

    for( const key in response.data){
        const taskData = response.data[key];
        let subtasks = null; // Initialize subtasks as null

        if (taskData.subtasks) {
            // Check if subtasks exist in taskData
            subtasks = [];
            // Iterate over the keys in taskData.subtasks
            for (const subtaskKey in taskData.subtasks) {
                const subtask = taskData.subtasks[subtaskKey];
                // Push subtasks into the subtasks array
                subtasks.push(subtask);
            }
        }
        const taskObj = {
            id: key,
            date: new Date (response.data[key].date),
            startDate: new Date (response.data[key].startDate),
            description: response.data[key].description,
            location: response.data[key].location,
            reminder:new Date(response.data[key].reminder),
            title:response.data[key].title,
            link: response.data[key].link,
            //subtasks:response.data[key].subtasks
            subtasks:subtasks,
            calendarEventId: response.data[key].calendarEventId,
            
            
        };
        tasks.push(taskObj);
    }
    return tasks;
}

export function updateTask(id, taskData){
    return axios.put(BACKEND_URL +`/tasks/${id}.json`, taskData);

}

export function deleteTask(id){
    return axios.delete(BACKEND_URL +`/tasks/${id}.json`);

}

// Function to update Firebase with the new subtask status
export async function updateSubtaskStatusInFirebase(taskId, subtaskId, newStatus) {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/tasks/${taskId}/subtasks/${subtaskId}.json`,
            { completed: newStatus }
        );

        if (response.status === 200) {
            console.log('Subtask status updated in Firebase');
        } else {
            console.error('Failed to update subtask status in Firebase');
        }
    } catch (error) {
        console.error('Error updating subtask status in Firebase:', error);
    }
}

// Function to update Firebase with the new calendarEventId
export async function updateCalendarEventId(taskId, calendarEventId) {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/tasks/${taskId}.json`,
            { calendarEventId: calendarEventId }
        );

        if (response.status === 200) {
            console.log('CalendarEventId status updated in Firebase');
        } else {
            console.error('Failed to update CalendarEventId in Firebase');
            console.error('Response:', response.data); 
        }
    } catch (error) {
        console.error('Error updating CalendarEventId in Firebase:', error);
    }
}


  