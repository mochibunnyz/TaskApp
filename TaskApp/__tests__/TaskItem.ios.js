import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import TaskItem from '../components/TaskOutput/TaskItem'; 


// In  TaskItem.test.js file
jest.mock('../util/date'); // Adjust the path as needed

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
    Ionicons: {
      getName: () => 'Ionicons',
    },
}));
// Mock @react-navigation/native
const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
    }),
  };
}); 



describe('TaskItem Component', () => {
  
  
  test('example test', () => {
    // Render your TaskItem 
    render(<TaskItem title="Test Task" description="This is a test task" />);
  
    // query elements using screen
    const titleElement = screen.queryByText('Test Task');
    expect(titleElement).toBeTruthy();
  });

  it('navigates to task details screen when pressed', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(
      <TaskItem
        id="1"
        title="Test Task"
        description="This is a test task"
        date={new Date('2023-09-12')}
        navigation={navigation} // Pass the navigation object
        
      />
    );

    // Simulate a press event on the task item
    fireEvent.press(getByText('Test Task'));

    
  });

  
});