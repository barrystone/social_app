/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context } from "./../context"
import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PostCreateInput: { // input type
    content?: string | null; // String
    title: string; // String!
  }
  PostOrderByUpdatedAtInput: { // input type
    updatedAt: NexusGenEnums['SortOrder']; // SortOrder!
  }
  UserCreateInput: { // input type
    email: string; // String!
    name?: string | null; // String
    posts?: NexusGenInputs['PostCreateInput'][] | null; // [PostCreateInput!]
  }
  UserUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
  SortOrder: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Mutation: {};
  Post: { // root type
    content?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    viewCount: number; // Int!
  }
  Profile: { // root type
    avatar?: string | null; // String
    bio?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    location?: string | null; // String
    userId?: number | null; // Int
    website?: string | null; // String
  }
  Query: {};
  Story: { // root type
    content?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Mutation: { // field return type
    createDraft: NexusGenRootTypes['Post'] | null; // Post
    createProfile: NexusGenRootTypes['Profile'] | null; // Profile
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    incrementPostViewCount: NexusGenRootTypes['Post'] | null; // Post
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    signup: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    togglePublishPost: NexusGenRootTypes['Post'] | null; // Post
    updateProfile: NexusGenRootTypes['Profile'] | null; // Profile
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    viewCount: number; // Int!
  }
  Profile: { // field return type
    avatar: string | null; // String
    bio: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    location: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
    userId: number | null; // Int
    website: string | null; // String
  }
  Query: { // field return type
    allUsers: NexusGenRootTypes['User'][]; // [User!]!
    draftsByUser: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    feed: NexusGenRootTypes['Post'][]; // [Post!]!
    me: NexusGenRootTypes['User'] | null; // User
    postById: NexusGenRootTypes['Post'] | null; // Post
  }
  Story: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string | null; // String
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    profile: NexusGenRootTypes['Profile']; // Profile!
    stories: NexusGenRootTypes['Story'][]; // [Story!]!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    createDraft: 'Post'
    createProfile: 'Profile'
    deletePost: 'Post'
    incrementPostViewCount: 'Post'
    login: 'AuthPayload'
    signup: 'AuthPayload'
    togglePublishPost: 'Post'
    updateProfile: 'Profile'
  }
  Post: { // field return type name
    author: 'User'
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    published: 'Boolean'
    title: 'String'
    updatedAt: 'DateTime'
    viewCount: 'Int'
  }
  Profile: { // field return type name
    avatar: 'String'
    bio: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    location: 'String'
    user: 'User'
    userId: 'Int'
    website: 'String'
  }
  Query: { // field return type name
    allUsers: 'User'
    draftsByUser: 'Post'
    feed: 'Post'
    me: 'User'
    postById: 'Post'
  }
  Story: { // field return type name
    author: 'User'
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    posts: 'Post'
    profile: 'Profile'
    stories: 'Story'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createDraft: { // args
      data: NexusGenInputs['PostCreateInput']; // PostCreateInput!
    }
    createProfile: { // args
      avatar?: string | null; // String
      bio?: string | null; // String
      id?: number | null; // Int
      location?: string | null; // String
      website?: string | null; // String
    }
    deletePost: { // args
      id: number; // Int!
    }
    incrementPostViewCount: { // args
      id: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    signup: { // args
      email: string; // String!
      name?: string | null; // String
      password: string; // String!
    }
    togglePublishPost: { // args
      id: number; // Int!
    }
    updateProfile: { // args
      avatar?: string | null; // String
      bio?: string | null; // String
      id?: number | null; // Int
      location?: string | null; // String
      website?: string | null; // String
    }
  }
  Query: {
    draftsByUser: { // args
      userUniqueInput: NexusGenInputs['UserUniqueInput']; // UserUniqueInput!
    }
    feed: { // args
      orderBy?: NexusGenInputs['PostOrderByUpdatedAtInput'] | null; // PostOrderByUpdatedAtInput
      searchString?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    postById: { // args
      id?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}