import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { formatDistance, subDays } from 'date-fns';

export const ALLSTORYS_QUERRY = gql`
  {
    allStorys {
      id
      createdAt
      content
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

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error.message}</h1>;

  interface allStorys {
    content: string;
    createdAt: Date;
    author: {
      name: string;
      profile: {
        avatar: string;
      };
    };
  }

  return (
    <div className="allstorys-wrapper">
      {data.allStorys.map((story: any) => (
        <div className="allstorys">
          <div className="allstorys__header">
            {story.author.profile && story.author.profile.avatar ? (
              <img src={story.author.profile?.avatar} alt="avatar" />
            ) : (
              <span>
                <i className="fa fa-user fa-5x" aria-hidden="true"></i>
              </span>
            )}
            <h4 className="allstorys__header-name">{story.author.name}</h4>
            <p className="allstorys__header-date">
              {formatDistance(
                subDays(new Date(story.createdAt), 0),
                new Date()
              )}{' '}
              ago
            </p>
          </div>
          <div className="allstorys__content">
            <p>{story.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allstorys;
