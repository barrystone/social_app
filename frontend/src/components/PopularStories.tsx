import React from 'react';
import { gql, useQuery } from '@apollo/client';

const POPULAR_STORIES = gql`
  {
    allStorys {
      id
      createdAt
      content
      likes {
        id
      }
      author {
        id
        profile {
          id
          avatar
        }
      }
    }
  }
`;

interface story {
  id: number;
  createAt: Date;
  content: string;
  author: {
    profile: {
      avatar: string;
    };
  };
  likes: {
    id: number;
    length: number;
  };
}

const PopularStories = () => {
  const { loading, error, data } = useQuery(POPULAR_STORIES);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error.message}</h1>;

  return <div></div>;
};

export default PopularStories;
