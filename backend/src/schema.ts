import { permissions } from './permissions'
import { applyMiddleware } from 'graphql-middleware'
import {
  makeSchema,
  objectType,
  inputObjectType,
  asNexusMethod,
  enumType,
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

import Query from './types/Query'
import Mutation from './types/Mutation'
import User from './types/User'
import Post from './types/Post'
import Story from './types/Story'
import Profile from './types/Profile'
import LikedStory from './types/LikedStory'
import Comment from './types/Comment'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const PostOrderByUpdatedAtInput = inputObjectType({
  name: 'PostOrderByUpdatedAtInput',
  definition(t) {
    t.nonNull.field('updatedAt', { type: 'SortOrder' })
  },
})

const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.string('id')
    t.string('email')
  },
})

const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('content')
  },
})

const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.string('name')
    t.list.nonNull.field('posts', { type: 'PostCreateInput' })
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

const schemaWithoutPermissions = makeSchema({
  types: [
    Query,
    Mutation,
    User,
    Post,
    Profile,
    Story,
    Comment,
    LikedStory,
    AuthPayload,
    UserUniqueInput,
    UserCreateInput,
    PostCreateInput,
    SortOrder,
    PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
