import { objectType } from 'nexus'
import { Context } from '../context'

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.string('content')
  },
})

export default Comment
