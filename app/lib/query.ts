export const userQuery = (userId: string) => {
  const query = `*[_type == "user" && _id == '${userId}'][0]`
  return query
}
