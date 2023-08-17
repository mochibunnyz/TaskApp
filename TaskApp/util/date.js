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
    x1 = new Date(date);
    x2 = x1.toString

    return date.toString()
    //return x2
}
export function getDateMinusDays(date, days){
    return new Date( date.getDate()-days, date.getMonth(), date.getFullYear());
    //return new Date(date.getFullYear(), date.getMonth(), date.getDate()-days);
}