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
  },
})

export default Story
