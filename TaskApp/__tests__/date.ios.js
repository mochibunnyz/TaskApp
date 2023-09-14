import { getFormattedDate, toDateStringFunction, toStringFunction, toStringSlice, toTimeSlice, getDateMinusDays, getDatePlusDays } from "../util/date";

// Mock the toLocaleDateString method using spyOn
const toLocaleDateStringSpy = jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue('2023-09-12');
// Mock toDateString
const toDateStringSpy = jest.spyOn(Date.prototype, 'toDateString').mockReturnValue('Tue Sep 12 2023');

// Mock toString
const toStringSpy = jest.spyOn(Date.prototype, 'toString').mockReturnValue('Tue Sep 12 2023 10:00:00 GMT+0000 (Coordinated Universal Time)');

// Mock toLocaleTimeString
const toLocaleTimeStringSpy = jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue('10:00:00 AM');

test('getFormattedDate formats date correctly', () => {
  const date = new Date('Tue Sep 12 2023 10:00:00 GMT+0000');
  const formattedDate = getFormattedDate(date);
  
  // Ensure that the spy was called
  expect(toLocaleDateStringSpy).toHaveBeenCalled();

  // Check if the function returned the expected value
  expect(formattedDate).toBe('2023-09-12'); // Adjust the expected value as needed
});

test('toDateStringFunction returns formatted date string', () => {
    const date = new Date('Tue Sep 12 2023 10:00:00 GMT+0000');
    const dateString = toDateStringFunction(date);

    // Ensure that the spy was called
    expect(toDateStringSpy).toHaveBeenCalled();

    expect(dateString).toBe('Tue Sep 12 2023');
});
  
test('toStringFunction returns formatted date string', () => {
    const date = new Date('Tue Sep 12 2023 10:00:00 GMT+0000');
    const dateString = toStringFunction(date);

    // Ensure that the spy was called
    expect(toStringSpy).toHaveBeenCalled();
    expect(dateString).toBe('Tue Sep 12 2023 10:00:00 GMT+0000 (Coordinated Universal Time)');
});
  
test('toStringSlice returns sliced formatted date string', () => {
    const date = new Date('Tue Sep 12 2023 10:00:00 GMT+0000');
    const slicedDateString = toStringSlice(date);
    // Ensure that the spy was called
    expect(toStringSpy).toHaveBeenCalled();

    expect(slicedDateString).toBe('Tue Sep 12 2023');
});
  
test('toTimeSlice returns formatted time string', () => {
    const date = new Date('Tue Sep 12 2023 10:00:00 GMT+0000');
    const timeString = toTimeSlice(date);

    // Ensure that the spy was called
    expect(toLocaleTimeStringSpy).toHaveBeenCalled();
    expect(timeString).toBe('10:00:00 AM');
});



// restore the original method after the test
afterAll(() => {
  toLocaleDateStringSpy.mockRestore();
  toDateStringSpy.mockRestore();
  toStringSpy.mockRestore();
 
});
