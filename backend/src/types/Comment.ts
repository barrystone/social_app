import { objectType } from 'nexus'
import { Context } from '../context'

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.string('content')
    t.field('user', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.comment
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .User()
      },
    })
  },
})

export default Comment
