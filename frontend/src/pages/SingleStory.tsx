import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Allstorys from '../components/AllStorys';
// import CreateReply from "../components/CreateReply"
import LeftNav from '../components/LeftNav';
import PopularStories from '../components/PopularStories';
import Storying from '../components/Storying';
// import PopularTweets from "../components/PopularTweets"

export const TWEET_QUERY = gql`
  query story($id: Int) {
    story(id: $id) {
      id
      content
      author {
        id
        name
        profile {
          id
          avatar
        }
      }
      comments {
        id
        content
        createdAt
        user {
          id
          name
          profile {
            id
            avatar
          }
        }
      }
    }
  }
`;

interface ParamType {
  id: string;
}
interface CommentType {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    profile: {
      id: number;
      avatar: string;
    };
  };
}

const SingleStory = () => {
  const history = useHistory();
  const { id } = useParams<ParamType>();

  const { loading, error, data } = useQuery(TWEET_QUERY, {
    variables: { id: parseInt(id) }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <div className="main-layout">
        <div className="left">
          <LeftNav />
        </div>
        <div className="home-wrapper">
          <div className="home">
            <div className="home-header">
              <span className="back-arrow" onClick={() => history.goBack()}>
                <i
                  className="fa fa-arrow-left"
                  aria-hidden="true"
                  style={{ margin: '10px 0 0px 20px', cursor: 'pointer' }}
                ></i>
              </span>
              <h3 className="home-title" style={{ margin: '5px 0 20px 20px' }}>
                Story
              </h3>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 8fr',
                marginTop: '10px',
                marginLeft: '10px'
              }}
            >
              {data.story.author.profile && data.story.author.profile.avatar ? (
                <img
                  src={data.story.author.profile.avatar}
                  style={{ width: '40px', borderRadius: '50%' }}
                  alt="avatar"
                />
              ) : (
                <span>
                  <i
                    className="fa fa-user fa-5x"
                    aria-hidden="true"
                    style={{ fontSize: '35px' }}
                  ></i>
                </span>
              )}
              <h5>{data.story.author.name}</h5>
            </div>
            <p
              style={{
                marginLeft: '20px',
                borderLeft: '1px solid var(--accent)',
                paddingLeft: '20px',
                height: '50px',
                marginTop: 0
              }}
            >
              {data.story.content}
            </p>
            {data.story.comments.map((comment: CommentType) => (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 8fr',
                    marginTop: '30px',
                    marginLeft: '10px'
                  }}
                >
                  {comment.user.profile && comment.user.profile.avatar ? (
                    <img
                      src={comment.user.profile.avatar}
                      style={{ width: '35px', borderRadius: '50%' }}
                      alt="avatar"
                    />
                  ) : (
                    <span>
                      <i
                        className="fa fa-user fa-5x"
                        aria-hidden="true"
                        style={{ fontSize: '30px' }}
                      ></i>
                    </span>
                  )}
                  <h5 style={{ margin: '10px 0 10px -20px' }}>
                    {' '}
                    {comment.user.name}
                  </h5>
                </div>
                <p style={{ margin: '10px 30px' }}>{comment.content}</p>
                {/*  */}
              </>
            ))}
          </div>
        </div>
        <div className="right">
          <PopularStories />
        </div>
      </div>
    </>
  );
};

export default SingleStory;
