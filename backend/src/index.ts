import express, { ErrorRequestHandler, Request, Response } from 'express'
import cors from 'cors'
import { addTask, createTableTasks, getAllTasks, getTask, deleteTask, updateTask } from './models/tasks'

const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)

app.get('/', async (_req: Request, res: Response) => {
  const result = await getAllTasks()
  return res.json({
    status: 'success!',
    message: result,
  })
})

app.post('/', async (req: Request, res: Response) => {
  const { description } = req.body
  const result = await addTask(description)
  return res.json({
    status: 'success!',
    message: `keys ${description}`,
    result,
  })
})

app.put('/task/:taskId', async (req: Request, res: Response) => {
  const { description, isComplete, isDeleted } = req.body
  await updateTask(parseInt(req.params.taskId), description, isComplete, isDeleted)
  // optionally fetch the updated object from db
  return res.json({
    status: 'success!',
  })
})

app.get('/task/:taskId', async (_req: Request, res: Response) => {
  const taskId = parseInt(_req.params.taskId)
  if (isNaN(taskId)) {
    return res.json({
      status: 'error',
      message: 'Invalid path'
    })
  }
  const result = await getTask(taskId)
  return res.json({
    status: 'success!',
    message: result,
  })
})

app.delete('/task/:taskId', async (_req: Request, res: Response) => {
  const taskId = parseInt(_req.params.taskId)
  if (isNaN(taskId)) {
    return res.json({
      status: 'error',
      message: 'Invalid path'
    })
  }
  const result = await deleteTask(taskId)
  return res.json({
    status: 'success!',
    message: result,
  })
})

// temp solution while migrations are not in place
app.get('/setup', async (_req: Request, res: Response) => {
  try {
    await createTableTasks()
    return res.json({
      message: 'Successfully created table',
    })
  } catch (err) {
    console.log(err)
    return res.json({
      message: 'Error, is table already created?',
    })
  }
})

app.listen(4000, () => {
  console.debug('listening on port 4000')
})

async function errorHandler(_err: ErrorRequestHandler, _req: Request, res: Response, next: any) {
  try {
    await next()
  } catch (err: any) {
    res.status(500)
    console.error(err)
    res.json({
      error: 'InternalServerError',
      message: err.message || {},
    })
  }
}