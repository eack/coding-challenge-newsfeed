import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Announcement {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
  }
  
  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    projects: [Project]
    announcements(fellowship: String!, offset: Int, limit: Int): [Announcement]
  }
`;

export const server = new ApolloServer({typeDefs, resolvers})
