export function getFormattedDate(date){
    // return ` ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    //return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    return date.toLocaleDateString();
    //return date.toISOString().slice(0,10);
    //return date.toUTCString().slice(0,17); 
    //return date.toDateString()
}

export function toDateStringFunction(date){
    return date.toDateString()
}

export function toStringFunction(date){
   
    return date.toString()
    //return x2
}

export function toStringSlice(date){
    //return date.toString().slice(0,17);
    return date.toString().slice(0,15);
}

export function toTimeSlice(date){
    return date.toLocaleTimeString();
}
export function getDateMinusDays(date, days){
    return new Date( date.getDate()-days, date.getMonth(), date.getFullYear());
    //return new Date(date.getFullYear(), date.getMonth(), date.getDate()-days);
}
export function getDatePlusDays(date,days){
    //reminder.setSeconds(reminder.getSeconds() + 20);
    
    
    //date.setDate(date.getDate() + days);
    //date = date.toDateString();

    //return date;
    //return new Date( date.getDate()+days, date.getMonth(), date.getFullYear());
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()+days);

}
/* export function getDateMinusDays(date, days) {
    const newDate = new Date(date); // Create a new date object to avoid modifying the original date
    newDate.setDate(newDate.getDate() - days);
    return newDate;
}
  
export function getDatePlusDays(date, days) {
    const newDate = new Date(date); // Create a new date object to avoid modifying the original date
    newDate.setDate(newDate.getDate() + days);
    return newDate;
} */