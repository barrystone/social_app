import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import '../assets/css/popularStories.css';

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

  const getPopularTweets = data.allStorys
    .map((story: story) => story)
    .sort(function (a: story, b: story) {
      return b.likes.length - a.likes.length;
    })
    .slice(0, 6);

  return (
    <div className="popular-stories">
      <h2 className="trending">Trending</h2>
      {getPopularTweets.map((story: story) => (
        <div className="popular-story-container" key={story.id}>
          <div className="date-title">
            <div className="title-logo">
              {story.author.profile && story.author.profile.avatar ? (
                <img
                  src={story.author.profile.avatar}
                  style={{ width: '40px', borderRadius: '50%', margin: '10px' }}
                  alt="avatar"
                />
              ) : (
                <span>
                  <i
                    className="fa fa-user fa-5x"
                    aria-hidden="true"
                    style={{ fontSize: '35px', margin: '10px' }}
                  ></i>
                </span>
              )}
              <p className="story-content" style={{ margin: '20px' }}>
                {story.content}
              </p>
            </div>
            <p className="date">
              {/* problem bellow createAt should be createdAt */}
              {/* <p>popular story</p> */}
              {/* {format(new Date(story.createdAt), 'MM/dd/yy')} */}
            </p>
          </div>
          <div className="story-likes">
            {story.likes.length > 0 ? (
              <span>Likes {story.likes.length}</span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularStories;
