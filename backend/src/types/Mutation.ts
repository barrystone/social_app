import { APP_SECRET, getUserId } from '../utils'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { intArg, nonNull, objectType, stringArg, arg, nullable } from 'nexus'
import { Context } from '../context'

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10)
        const user = await context.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('createProfile', {
      type: 'Profile',
      args: {
        id: intArg(),
        bio: stringArg(),
        location: stringArg(),
        website: stringArg(),
        avatar: stringArg(),
      },
      resolve: (_, args, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.profile.create({
          data: {
            ...(args as any), // Temporary solution for typescript problem
            user: {
              connect: {
                id: userId,
              },
            },
          },
        })
      },
    })

    t.field('updateProfile', {
      type: 'Profile',
      args: {
        id: intArg(),
        bio: stringArg(),
        location: stringArg(),
        website: stringArg(),
        avatar: stringArg(),
      },
      resolve: (_, { id, ...args }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user.')
        return ctx.prisma.profile.update({
          data: {
            ...args,
          },
          where: {
            id: Number(id),
          },
        })
      },
    })

    t.field('createStory', {
      type: 'Story',
      args: {
        content: stringArg(),
      },
      resolve: (_, { content }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw new Error('Could not authenticate user!')
        return ctx.prisma.story.create({
          data: {
            content,
            author: { connect: { id: userId } },
          },
        })
      },
    })

    t.field('likeStory', {
      type: 'LikedStory',
      args: {
        id: intArg(),
      },
      resolve: (parent, { id: storyId }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw Error('Could not authenticate user!')
        return ctx.prisma.likedStory.create({
          data: {
            story: { connect: { id: Number(storyId) } },
            user: { connect: { id: userId } },
          },
        })
      },
    })

    t.field('unLikeStory', {
      type: 'LikedStory',
      args: {
        id: intArg(),
      },
      resolve: (parent, { id: likedStoryId }, ctx) => {
        const userId = getUserId(ctx)
        if (!userId) throw Error('Could not authenticate user!')
        return ctx.prisma.likedStory.delete({
          where: { id: Number(likedStoryId) },
        })
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        data: nonNull(
          arg({
            type: 'PostCreateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        const userId = getUserId(context)
        return context.prisma.post.create({
          data: {
            title: args.data.title,
            content: args.data.content,
            authorId: userId?.toString(),
          },
        })
      },
    })

    t.field('togglePublishPost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, args, context: Context) => {
        try {
          const post = await context.prisma.post.findUnique({
            where: { id: args.id || undefined },
            select: {
              published: true,
            },
          })
          return context.prisma.post.update({
            where: { id: args.id || undefined },
            data: { published: !post?.published },
          })
        } catch (e) {
          throw new Error(
            `Post with ID ${args.id} does not exist in the database.`,
          )
        }
      },
    })

    t.field('incrementPostViewCount', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.post.update({
          where: { id: args.id || undefined },
          data: {
            viewCount: {
              increment: 1,
            },
          },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.post.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

export default Mutation
