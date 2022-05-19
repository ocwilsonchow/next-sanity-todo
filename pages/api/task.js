import { client, sanity } from "./sanity"

// Get all tasks
export async function apiGetAllTasks(){
  const query = `*[_type == "task"]`

  const sanityResponse = await client.fetch(query)
  return sanityResponse
}


// Create new task
export async function apiCreateTask(doc) {
  try {
    const sanityResponse = await client.create(doc)
  } catch (error) {
    console.log(error)
  }
}
