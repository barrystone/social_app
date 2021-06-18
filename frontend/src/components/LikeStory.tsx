import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { ALLSTORYS_QUERRY } from './AllStorys';
import { ME_QUERY } from '../pages/Profile';

const LIKE_STORY_MUTATION = gql`
  mutation likeStory($id: Int) {
    likeStory(id: $id) {
      id
    }
  }
`;

interface Props {
  id: number;
}

const LikeStory = ({ id }: Props) => {
  const [likeStory] = useMutation(LIKE_STORY_MUTATION, {
    refetchQueries: [{ query: ALLSTORYS_QUERRY }, { query: ME_QUERY }]
  });

  const handleAddLike = async () => {
    await likeStory({
      variables: { id }
    });
  };
  return (
    <span onClick={handleAddLike}>
      <i className="far fa-thumbs-up" aria-hidden="true" />
    </span>
  );
};

export default LikeStory;
