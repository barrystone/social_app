import { objectType } from 'nexus'
import { Context } from '../context'

const Story = objectType({
  name: 'Story',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.string('content')
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.story
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author()
      },
    })
    t.list.field('likes', {
      type: 'LikedStory',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.story
          .findUnique({ where: { id: parent.id } || undefined })
          .likes()
      },
    })
  },
})

export default Story
