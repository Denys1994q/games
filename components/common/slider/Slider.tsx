import { useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ISliderComponentProps } from "./Slider.props";

const SliderComponent = ({ arr, slidesToShowNum, imgClass }: ISliderComponentProps): JSX.Element => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShowNum,
        slidesToScroll: slidesToShowNum,

        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const slides =
        arr.length > 0
            ? arr.map(item => {
                  return (
                      <div>
                          <img className={imgClass} src={item} alt='game-image' />
                      </div>
                  );
              })
            : null;

    return (
        <div>
            <Slider {...settings}>{slides}</Slider>
        </div>
    );
};

export default SliderComponent;
