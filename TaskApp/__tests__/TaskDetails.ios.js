import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskDetails from '../screens/TaskDetails'; // Update the import path as per your project structure.
import { TasksContext } from '../store/tasks-context'; // Import your context

// Mock @expo/vector-icons

jest.mock('@expo/vector-icons', () => ({
    Ionicons: {
      getName: () => 'Ionicons',
    },
}));
  

test('renders TaskDetails component', async () => {
  // Mock route and navigation objects
  const route = {
    params: {
      taskId: 1, // Replace with the desired taskId fortest
    },
  };

  const navigation = {
    setOptions: jest.fn(),
    goBack: jest.fn(),
  };

  const tasksData = [
    // Provide a sample task that matches the selectedTask in  component
    {
      id: 1,
      title: 'Sample Task',
      startDate: new Date(),
      date: new Date(),
      description: 'Sample Description',
      subtasks: [], // You can provide subtasks as needed
      link: 'https://example.com',
      reminder: new Date(),
    },
  ];

  const { getByText } = render(
    // Provide the tasks data through TasksContext.Provider
    <TasksContext.Provider value={{ tasks: tasksData }}>
      <TaskDetails route={route} navigation={navigation} />
    </TasksContext.Provider>
  );

  // Check if the title from  component are rendered
  expect(getByText('Details')).toBeTruthy(); // Change 'Details' to the expected title text
 

  
  navigation.goBack.mockClear();
});
