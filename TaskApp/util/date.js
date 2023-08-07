export function getFormattedDate(date){
    // return ` ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    //return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    return date.toLocaleDateString().slice(0,10);
}
export function getDateMinusDays(date, days){
    return new Date( date.getDate()-days, date.getMonth(), date.getFullYear());
    //return new Date(date.getFullYear(), date.getMonth(), date.getDate()-days);
}