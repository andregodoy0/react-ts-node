export interface TaskObject {
  description: string,
  isComplete: boolean,
  isDeleted: boolean
  id?: number
}

export const initialState = {
  taskList: <Array<TaskObject>>[],
  newTask: <TaskObject>{
    description: '',
    isComplete: false,
    isDeleted: false,
    id: undefined
  }
}

type TaskState = typeof initialState;

type TaskActionAdd = {
  type: 'add'
  payload: TaskObject
}
type TaskActionFetchAll = {
  type: 'fetch'
  payload: TaskObject[]
}
type TaskActionDelete = {
  type: 'delete'
  id: number
}
type TaskActionUpdate = {
  type: 'update',
  payload: TaskObject
}
export type TaskActions = TaskActionAdd | TaskActionFetchAll | TaskActionDelete | TaskActionUpdate

const taskReducer = (state: TaskState, action: TaskActions): TaskState => {
  switch (action.type) {
    case 'add': {
      return {
        taskList: [...state.taskList, action.payload],
        newTask: {
          description: '',
          isComplete: false,
          isDeleted: false
        }
      }
    }
    case 'fetch': {
      return {
        ...state,
        taskList: action.payload
      }
    }
    case 'delete': {
      const taskIndex = state.taskList.findIndex(({id}) => id === action.id)
      if (taskIndex >= 0) {
        state.taskList.splice(taskIndex, 1)
      }
      return {
        ...state,
        taskList: state.taskList,
      }
    }
    case 'update': {
      const taskIndex = state.taskList.findIndex(({id}) => id === action.payload.id)
      if (taskIndex >= 0) {      
        state.taskList.splice(taskIndex, 1, {...action.payload})
      }
      return {
        ...state,
        taskList: state.taskList,
      }
    }
    default: 
      return state
  }
}

export default taskReducer