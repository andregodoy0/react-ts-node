import pool from './db'

export const getAllTasks = async () => {
  return (await pool.query('SELECT * FROM tasks')).rows
}

export const getTask = async (id: number) => {
  return (await pool.query('SELECT * FROM tasks where id = $1', [id])).rows?.[0]
}

export const deleteTask = async (id: number) => {
  return (await pool.query('DELETE FROM tasks where id = $1', [id])).rows?.[0]
}

export const updateTask = async (id: number, description: string, isComplete: boolean = false, isDeleted: boolean = false) => {
  return (
    await pool.query('UPDATE tasks SET description = $1, isComplete = $2, isDeleted = $3 WHERE id = $4', [description, isComplete, isDeleted, id])
  ).rows?.[0]
}

export const addTask = async (description: string, isComplete: boolean = false, isDeleted: boolean = false) => {
  return (
    await pool.query('INSERT INTO tasks (description, isComplete, isDeleted) VALUES ($1, $2, $3) RETURNING id', [description, isComplete, isDeleted])
  ).rows?.[0]
}

export const createTableTasks = async () => {
  await pool.query(`CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(100),
    isComplete BOOL default false,
    isDeleted BOOL default false
  )`)
}