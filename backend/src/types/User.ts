import { objectType } from 'nexus'
import { Context } from '../context'

// Because we don't want query can request password, so we don't need to define password here.
const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nullable.string('name')
    t.nonNull.string('email')
    t.list.field('posts', {
      type: 'Post',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts()
      },
    })
    t.field('profile', {
      type: 'Profile',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .profile()
      },
    })
    t.list.field('stories', {
      type: 'Story',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .stories()
      },
    })
    t.list.field('likedStories', {
      type: 'LikedStory',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .likedStories()
      },
    })
    t.list.field('comments', {
      type: 'Comment',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.user
          .findUnique({ where: { id: parent.id } || undefined })
          .comments()
      },
    })
  },
})

export default User
