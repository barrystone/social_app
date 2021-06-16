import { objectType } from 'nexus'
import { Context } from '../context'

const LikedStory = objectType({
  name: 'LikedStory',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('likedAt', { type: 'DateTime' })
    t.field('story', {
      type: 'Story',
      resolve: (parent, _, context: Context) => {
        return context.prisma.likedStory
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .story()
      },
    })
    t.field('user', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.likedStory
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .user()
      },
    })
  },
})

export default LikedStory
