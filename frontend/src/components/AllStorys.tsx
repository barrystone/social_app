import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { formatDistance, subDays } from 'date-fns';
import { ME_QUERY } from '../pages/Profile';
import LikeStory from './LikeStory';
import UnLikeStory from './UnLikeStory';

export const ALLSTORYS_QUERRY = gql`
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
        name
        profile {
          id
          avatar
        }
      }
    }
  }
`;
const Allstorys = () => {
  const { loading, error, data } = useQuery(ALLSTORYS_QUERRY);
  const {
    loading: meLoading,
    error: meError,
    data: meData
  } = useQuery(ME_QUERY);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error.message}</h1>;

  if (meLoading) return <h1>Loading...</h1>;
  if (meError) return <h1>{meError.message}</h1>;

  interface allStorys {
    id: number;
    createdAt: Date;
    content: string;
    likes: [];
    author: {
      name: string;
      profile: {
        avatar: string;
      };
    };
  }
  interface likedStory {
    id: number;
    story: {
      id: number;
    };
  }

  const findLikedStory = (storyId: number) =>
    meData.me.likedStories.filter(
      (likedStory: likedStory) => likedStory.story.id === storyId
    )[0];

  return (
    <div className="allstorys">
      {data.allStorys.map((story: allStorys, idx: number) => (
        <div className="allstorys-item" key={idx}>
          <div className="allstorys-item__header">
            {story.author.profile && story.author.profile.avatar ? (
              <img src={story.author.profile?.avatar} alt="avatar" />
            ) : (
              <span>
                <i className="fa fa-user fa-5x" aria-hidden="true"></i>
              </span>
            )}
            <h4 className="allstorys-item__header-name">{story.author.name}</h4>
            <p className="allstorys-item__header-date">
              {formatDistance(
                subDays(new Date(story.createdAt), 0),
                new Date()
              )}{' '}
              ago
            </p>
          </div>
          <div className="allstorys-item__content">
            <div className="allstorys-item__content-words">
              <p>{story.content}</p>
            </div>
            <div className="allstorys-item__content-likes">
              {findLikedStory(story.id) ? (
                <>
                  <span>
                    <UnLikeStory id={findLikedStory(story.id).id} />
                  </span>
                  {story.likes.length}
                </>
              ) : (
                <>
                  <span>
                    <LikeStory id={story.id} />
                  </span>
                  {story.likes.length}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allstorys;
