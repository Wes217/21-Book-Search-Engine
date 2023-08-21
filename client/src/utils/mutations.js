import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
  `

export const SAVE_BOOK = gql`
mutation Mutation($newBook: BookInput!) {
    saveBook(newBook: $newBook) {
      _id
      username
      email
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

export const REMOVE_BOOK = gql`
mutation Mutation($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
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