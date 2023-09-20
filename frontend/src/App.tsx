import { useReducer, useState } from 'react'
import { useAddTask, useGetAllTasks, useRemoveTask, useUpdateTask } from './hooks/tasks'

import taskReducer, { initialState } from './reducers/taskReducer'

export interface Task {
  description: string,
  isComplete: boolean,
  isDeleted: boolean
  id?: number
}

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
  }

  const handleDeleteTask = async (id: number) => {
    if (await useRemoveTask(id)) {
      dispatch({
        type: 'delete',
        id,
      })
    }
  }

  const handleCompleteTask = async (task: Task) => {
    task.isComplete = !task.isComplete
    if (task?.id && await useUpdateTask(task)) {
      dispatch({
        type: 'update',
        payload: task,
      })
    }
  }

  return (
    <div className='flex items-center justify-center h-screen flex-col con'>
      <h1 className="text-3xl font-bold pb-3">
        Tasks
      </h1>
      <div className="card">
        <input name='newTask' onChange={handleChange} className='border-2 border-gray-200 rounded-l-2xl p-2'/>
        <button onClick={handleAddTask} className='rounded-r-2xl p-2 border-2 border-blue-400 bg-blue-400'>Add!</button>
        <ul>
          {state.taskList.map((item => 
            <li key={item.id} className='m-1 flex justify-end'>
              <span className='px-2 mr-2 justify-items-start'>
                {item.description}
              </span>
              <button onClick={() => handleCompleteTask(item)} className='rounded-full px-2 mr-1 bg-green-400'>
                {item.isComplete ? 'Redo' : 'Complete'}
              </button>
              <button onClick={() => handleDeleteTask(item.id!)} className='rounded-full px-2 bg-red-400'>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
