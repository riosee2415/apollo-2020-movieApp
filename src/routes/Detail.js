import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }

    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const basicAnimation = keyframes`
  from {
    opacity : 0
  } to {
    opacity : 1
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #000000, #434343);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 20px;
`;

const SubTitle = styled.h4`
  font-size: 35px;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 22px;
`;

const Icon = styled.span`
  animation: ${basicAnimation} 2s linear infinite;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const SuggestionContainer = styled.div`
  width: 100%;
  height: 300px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const SuggestionPost = styled.div`
  width: 200px;
  height: 280px;
  border: 1px solid rgba(200, 200, 200);
  border-radius: 5px;
  box-shadow: 2px 4px 4px rgba(200, 200, 200);
  background-image: url(${(props) => props.bg});
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });

  return (
    <>
      <Container>
        <Column>
          <Title>{loading ? "Loading..." : data.movie.title}</Title>
          {!loading && (
            <>
              <SubTitle>
                {data?.movie?.language} <Icon>🍀</Icon> {data?.movie?.rating}
              </SubTitle>
              <Description>{data?.movie?.description_intro}</Description>
            </>
          )}
        </Column>

        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </Container>

      <SuggestionContainer>
        {!loading &&
          data?.suggestions?.map((doc, idx) => {
            return (
              <Link to={`/${doc.id}`} key={doc.id}>
                <SuggestionPost bg={doc.medium_cover_image}></SuggestionPost>
              </Link>
            );
          })}
      </SuggestionContainer>
    </>
  );
};
