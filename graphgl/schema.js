const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        userName: String!
        email: String!
        phoneNumber: String 
        password: String 
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        userName: String!
        phoneNumber: String!
        password: String!
    }

    input PostInputData {
        title: String!
        content: String!
        imageUrl: String!
    }

    type objects {
        text: String!
        views: Int
    }

    type RootQuery {
        logino(email: String!, password: String!): AuthData!
        hello: objects
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post! 
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
