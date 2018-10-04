import * as React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import styled, { css } from 'react-emotion';
import { colors } from '../styles/colors';
import { lighten } from 'polished';

const PostCardStyles = css`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 40px;
  min-height: 300px;
  background: #fff center center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  transition: all 0.5s ease;

  :hover {
    box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
    transition: all 0.4s ease;
    transform: translate3D(0, -1px, 0) scale(1.02);
  }
`;

const PostCardImageLink = css`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

const PostCardImage = styled.div`
  width: auto;
  height: 200px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostCardContentLink = css`
  position: relative;
  flex-grow: 1;
  display: block;
  padding: 25px 25px 0;
  color: var(--darkgrey);

  :hover {
    text-decoration: none;
  }
`;

const PostCardTags = styled.span`
  display: block;
  margin-bottom: 4px;
  color: var(--midgrey);
  font-size: 1.2rem;
  line-height: 1.15em;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const PostCardTitle = styled.h2`
  margin-top: 0;
`;

const PostCardExcerpt = styled.section`
  font-family: Georgia, serif;
`;

const PostCardMeta = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 25px 25px;
`;

const AuthorList = styled.ul`
  display: flex;
  flex-wrap: wrap-reverse;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AuthorListItem = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  :nth-child(1) {
    z-index: 10;
  }
  :nth-child(2) {
    z-index: 9;
  }
  :nth-child(3) {
    z-index: 8;
  }
  :nth-child(4) {
    z-index: 7;
  }
  :nth-child(5) {
    z-index: 6;
  }
  :nth-child(6) {
    z-index: 5;
  }
  :nth-child(7) {
    z-index: 4;
  }
  :nth-child(8) {
    z-index: 3;
  }
  :nth-child(9) {
    z-index: 2;
  }
  :nth-child(10) {
    z-index: 1;
  }
  :hover .author-name-tooltip {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const AuthorNameTooltip = styled.div`
  position: absolute;
  bottom: 105%;
  z-index: 999;
  display: block;
  padding: 2px 8px;
  color: white;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
  white-space: nowrap;
  background: var(--darkgrey);
  border-radius: 3px;
  box-shadow: rgba(39, 44, 49, 0.08) 0 12px 26px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transform: translateY(6px);
  pointer-events: none;

  @media (max-width: 650px) {
    display: none;
  }
`;

const StaticAvatar = css`
  display: block;
  overflow: hidden;
  margin: 0 -5px;
  width: 34px;
  height: 34px;
  border: #fff 2px solid;
  border-radius: 100%;
`;

const AuthorProfileImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  /* background: color(var(--lightgrey) l(+10%)); */
  background: ${lighten('0.1', colors.lightgrey)}
  border-radius: 100%;
  object-fit: cover;
`;

const ReadingTime = styled.span`
  flex-shrink: 0;
  margin-left: 20px;
  color: ${colors.midgrey};
  font-size: 1.2rem;
  line-height: 33px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export interface PostCardProps {
  post: {
    excerpt: string;
    timeToRead: number;
    fields: {
      slug: string;
    };
    frontmatter: {
      image?: {
        childImageSharp: {
          sizes: any;
        };
      };
      title: string;
      date: string;
      tags?: string[];
      author: {
        id: string;
        bio: string;
        avatar: {
          children: {
            fixed: {
              src: string;
            };
          }[];
        };
      };
    };
  };
}

const PostCard: React.SFC<PostCardProps> = props => (
  // TODO: no-image class?
  <article className={`post-card ${PostCardStyles}`}>
    {props.post.frontmatter.image && (
      <Link className={`${PostCardImageLink} post-card-image-link`} to={props.post.fields.slug}>
        <PostCardImage className="post-card-image">
          {props.post.frontmatter.image &&
            props.post.frontmatter.image.childImageSharp.sizes && (
              <Img style={{ height: '100%' }} sizes={props.post.frontmatter.image.childImageSharp.sizes} />
            )}
        </PostCardImage>
      </Link>
    )}
    <PostCardContent className="post-card-content">
      <Link className={`${PostCardContentLink} post-card-content-link`} to={props.post.fields.slug}>
        <header className="post-card-header">
          {props.post.frontmatter.tags && <PostCardTags>{props.post.frontmatter.tags[0]}</PostCardTags>}
          <PostCardTitle>{props.post.frontmatter.title}</PostCardTitle>
        </header>
        <PostCardExcerpt>
          <p>{props.post.excerpt}</p>
        </PostCardExcerpt>
      </Link>
      <PostCardMeta className="post-card-meta">
        <AuthorList>
          <AuthorListItem>
            <AuthorNameTooltip className="author-name-tooltip">{props.post.frontmatter.author.id}</AuthorNameTooltip>
            <Link className={`${StaticAvatar}`} to={`/author/${_.kebabCase(props.post.frontmatter.author.id)}/`}>
              <AuthorProfileImage src={props.post.frontmatter.author.avatar.children[0].fixed.src} alt={props.post.frontmatter.author.id} />
            </Link>
          </AuthorListItem>
        </AuthorList>
        <ReadingTime>{props.post.timeToRead} min read</ReadingTime>
      </PostCardMeta>
    </PostCardContent>
  </article>
);

export default PostCard;