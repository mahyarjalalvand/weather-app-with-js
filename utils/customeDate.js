const DAYS = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];


const getWeekDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()];
}
export {getWeekDay};