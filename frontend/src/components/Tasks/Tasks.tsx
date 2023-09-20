
import { useRemoveTask, useUpdateTask } from '../../hooks/tasks'
import { TaskObject, TaskActions } from '../../reducers/taskReducer'

const Task = ({task, dispatch}: {task: TaskObject, dispatch: React.Dispatch<TaskActions>}) => {

  const handleDeleteTask = async (id: number) => {
    if (await useRemoveTask(id)) {
      dispatch({
        type: 'delete',
        id,
      })
    }
  }

  const handleCompleteTask = async (task: TaskObject) => {
    task.isComplete = !task.isComplete
    if (task?.id && await useUpdateTask(task)) {
      dispatch({
        type: 'update',
        payload: task,
      })
    }
  }
  return (
    <li key={task.id} className='m-1 flex justify-end'>
      <span className='px-2 mr-2 justify-tasks-start'>
        {task.description}
      </span>
      <button onClick={() => handleCompleteTask(task)} className='rounded-full px-2 mr-1 bg-green-400'>
        {task.isComplete ? 'Redo' : 'Complete'}
      </button>
      <button onClick={() => handleDeleteTask(task.id!)} className='rounded-full px-2 bg-red-400'>Delete</button>
    </li>
  )
}

export default Task
