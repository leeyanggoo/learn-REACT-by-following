import { axios } from "axios";
import React, { useEffect, useState } from "react";

//
import "./Row.css";
import instance from "../api/axios";
import MovieModal from "./MovieModal";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ title, id, fetchUrl, isLargeRow = false }) => {
  const [rowMovies, setRowMovies] = useState([]);
  const [rowModalOpen, setRowModalOpen] = useState(false);
  const [rowSelectedMovie, setRowSelectedMovie] = useState({});

  useEffect(() => {
    fetchRowMoiveData();
  }, [fetchUrl]);

  const fetchRowMoiveData = async () => {
    const request = await instance.get(fetchUrl);
    setRowMovies(request.data.results);
    return request;
  };

  const handleRowMovieClick = (movie) => {
    setRowModalOpen(true);
    setRowSelectedMovie(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      {/* <div className="slider">
        <div
          className="slider__arrow-left"
          // onClick={() =>
          //   (document.getElementById(id).scrollLeft -= window.innerWidth - 80)
          // }
        >
          <span className="arrow">{"<"}</span>
        </div> */}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
      >
        <div id={id} className="row__posters">
          {rowMovies.map((movie) => (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${process.env.REACT_APP_IMAGE_URL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                loading="lazy"
                onClick={() => handleRowMovieClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {/* <div
          className="slider__arrow-right"
          // onClick={() =>
          //   (document.getElementById(id).scrollLeft += window.innerWidth - 80)
          // }
        >
          <span className="arrow">{">"}</span>
        </div> */}
      {/* </div> */}
      {rowModalOpen && (
        <MovieModal {...rowSelectedMovie} setModalOpen={setRowModalOpen} />
      )}
    </section>
  );
};

export default Row;
