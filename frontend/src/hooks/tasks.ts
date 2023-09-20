import axios from 'axios'
import { useEffect } from 'react'

import {Task} from '../App'

const api = 'http://localhost:4000'

export const useGetAllTasks = async (setTaskList: React.Dispatch<React.SetStateAction<Task[]>>) => {
  useEffect(() => {
    async function fetchTasks() {
      const tasks = (await axios.get(api)).data.message
      setTaskList(tasks)
    }
    fetchTasks()
  }, [])
}

export const useAddTask = async (task: Task) => {
    const id = (await axios.post(api, {...task})).data.result.id
    return {
      ...task,
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