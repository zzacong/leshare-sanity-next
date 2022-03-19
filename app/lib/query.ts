export const userQuery = (userId: string) => {
  const query = `*[_type == "user" && _id == '${userId}'][0]`
  return query
}

export const searchQuery = (searchTerm: string) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image {
          asset -> {
            url
          }
        },
        _id,
        title,
        destination,
        postedBy -> {
          _id,
          name,
          image
        },
        save[] {
          _key,
          postedBy -> {
            _id,
            name,
            image
          },
        },
      }
  `
  return query
}

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    name,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      name,
      image
    },
  },
}
`
