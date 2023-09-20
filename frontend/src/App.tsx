import { useState } from 'react'
import { useAddTask, useGetAllTasks, useRemoveTask, useUpdateTask } from './hooks/tasks'

export interface Task {
  description: string,
  isComplete: boolean,
  isDeleted: boolean
  id?: number
}

function App() {
  const [taskList, setTaskList] = useState<Array<Task>>([])
  const [task, setTask] = useState<Task>({
    description: '',
    isComplete: false,
    isDeleted: false
  })

  useGetAllTasks(setTaskList)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      description: e.target.value
    })
  }

  const handleAddTask = async () => {
    const savedTask = await useAddTask(task)
    if (savedTask) {
      taskList.push(savedTask)
      setTaskList(taskList)
      setTask({
        ...task,
        description: ''
      })
    }
  }

  const handleDeleteTask = async (index: number) => {
    const task = taskList[index]
    if (task?.id && await useRemoveTask(task.id)) {
      taskList.splice(index, 1)
      setTaskList([...taskList])
    }
  }

  const handleCompleteTask = async (index: number) => {
    const task = taskList[index]
    task.isComplete = !task.isComplete
    if (task?.id && await useUpdateTask(task)) {
      taskList.splice(index, 1, {...task})
      setTaskList([...taskList])
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
          {taskList.map(((item, index) => 
            <li key={item.id} className='m-1 flex justify-end'>
              <span className='px-2 mr-2 justify-items-start'>
                {item.description}
              </span>
              <button onClick={() => handleCompleteTask(index)} className='rounded-full px-2 mr-1 bg-green-400'>
                {item.isComplete ? 'Redo' : 'Complete'}
              </button>
              <button onClick={() => handleDeleteTask(index)} className='rounded-full px-2 bg-red-400'>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
