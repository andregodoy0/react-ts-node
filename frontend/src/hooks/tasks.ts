import axios from 'axios'
import { useEffect } from 'react'

import {Task} from '../App'

const api = 'http://localhost:4000'

export const useGetAllTasks = async (setTaskList: (task: Task[]) => void) => {
  useEffect(() => {
    async function fetchTasks() {
      const tasks = (await axios.get(api)).data.message
      setTaskList(tasks)
    }
    fetchTasks()
  }, [])
}

export const useAddTask = async (description: string): Promise<Task> => {
    const id = (await axios.post(api, {description})).data.result.id
    return {
      description,
      isComplete: false,
      isDeleted: false,
      id
    }
}

export const useUpdateTask = async (task: Task) => {
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