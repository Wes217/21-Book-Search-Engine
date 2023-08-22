import { gql } from '@apollo/client'

export const QUEY_ME = gql`
query Query {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`
