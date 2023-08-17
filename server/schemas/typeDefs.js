const typeDefs = `
  type User {
    __id: ID!
    username: String!
    email: String!
    bookCount: String!
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Book {
    bookId: ID!
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  input BookInput{
    bookId: ID!
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login:(email: String!, password: String!): Auth
    addUser:(username: String!,email: String!, password: String!): Auth
    saveBook:(newBook: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;