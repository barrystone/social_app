import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { ALLSTORYS_QUERRY } from './AllStorys';
import { ME_QUERY } from '../pages/Profile';

const UN_LIKE_STORY_MUTATION = gql`
  mutation unLikeStory($id: Int) {
    unLikeStory(id: $id) {
      id
    }
  }
`;

interface Props {
  id: number;
}

const UnLikeStory = ({ id }: Props) => {
  const [unLikeStory] = useMutation(UN_LIKE_STORY_MUTATION, {
    refetchQueries: [{ query: ALLSTORYS_QUERRY }, { query: ME_QUERY }]
  });

  const handleUnLike = async () => {
    await unLikeStory({
      variables: { id }
    });
  };
  return (
    <span onClick={handleUnLike}>
      <i className="fas fa-thumbs-up" aria-hidden="true" />
    </span>
  );
};

export default UnLikeStory;
