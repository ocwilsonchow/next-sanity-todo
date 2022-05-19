import { client, sanity } from "./sanity"

// Get all tasks
export async function apiGetAllTasks(){
  const query = `*[_type == "task"]`

  const sanityResponse = await client.fetch(query)
  return sanityResponse
}
