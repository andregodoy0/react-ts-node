import { useReducer, useState } from 'react'
import { useAddTask, useGetAllTasks } from './hooks/tasks'

import taskReducer, { initialState } from './reducers/taskReducer'
import Task from './components/Tasks/Tasks'

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState)
  const [taskDescription, setTaskDescription] = useState('')

  useGetAllTasks((taskList) => {
    dispatch({
      type: 'fetch',
      payload: taskList
    })
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value)
  }

  const handleAddTask = async () => {
      const savedTask = await useAddTask(taskDescription)
      dispatch({
        type: 'add',
        payload: savedTask,
      })
      // clear input after adding task
      setTaskDescription(() => '')
  }

  return (
    <div className='flex items-center justify-center h-screen flex-col con'>
      <h1 className="text-3xl font-bold pb-3">
        Tasks
      </h1>
      <div className="card">
        <input name='newTask' onChange={handleChange} value={taskDescription} className='border-2 border-gray-200 rounded-l-2xl p-2'/>
        <button onClick={handleAddTask} className='rounded-r-2xl p-2 border-2 border-blue-400 bg-blue-400'>Add!</button>
        <ul>
          {state.taskList.map((item => 
            <Task 
              task={item}
              dispatch={dispatch}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
