import React, { useEffect, useState } from "react";
import instance from "../api/axios";
import requests from "../api/requests";

//
import "./Banner.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: "none";

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 영화 목록 가져오기 20개
    const request = await instance.get(requests.fetchNowPlaying);

    // 그중 하나 선택
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 영화 정보 가져오기(비디오 포함)
    const { data: movieDetail } = await instance.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });

    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  console.log(`movie`, movie);

  return !isClicked ? (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className="banner__buttons">
          <button
            className="banner__button play"
            onClick={() => setIsClicked(true)}
          >
            Play
          </button>
          <button className="banner__button info">More Infomation</button>
        </div>

        <h1 className="banner__description">{truncate(movie.overview)}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  ) : (
    <Container>
      <HomeContainer>
        <Iframe
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&mute=1&loop=1&playlist=${movie.videos.results[0].key}`}
          width={640}
          height={360}
          allow="autoplay"
          allowFullScreen
        ></Iframe>
      </HomeContainer>
    </Container>
  );
};
export default Banner;
