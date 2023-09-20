import axios from 'axios'
import { useEffect } from 'react'

import { TaskObject } from '../reducers/taskReducer'

const api = 'http://localhost:4000'

export const useGetAllTasks = async (setTaskList: (task: TaskObject[]) => void) => {
  useEffect(() => {
    async function fetchTasks() {
      const tasks = (await axios.get(api)).data.message
      setTaskList(tasks)
    }
    fetchTasks()
  }, [])
}

export const useAddTask = async (description: string): Promise<TaskObject> => {
    const id = (await axios.post(api, {description})).data.result.id
    return {
      description,
      isComplete: false,
      isDeleted: false,
      id
    }
}

export const useUpdateTask = async (task: TaskObject) => {
    const id = (await axios.put(`${api}/task/${task.id}`, {...task})).data
    return {
      ...task,
      id
    }
}


export const useRemoveTask = async (taskId: number) => {
  const { status } = (await axios.delete(`${api}/task/${taskId}`)).data
  return status === 'success!'
}