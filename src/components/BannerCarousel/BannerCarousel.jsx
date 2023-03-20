import { Box } from '@chakra-ui/react'
import React from 'react'
import { Carousel } from 'react-bootstrap'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import "./bootstrap.min.css"

const BannerCarousel = ({ w, m, images }) => {
  return (
    <Box w={w} m={m}>
      <Carousel
        indicators={false}
        variant='dark'
        nextIcon={<IoIosArrowForward style={{ background: "black", fontSize: "30px", padding: "7px", borderRadius: "50%" }} />}
        prevIcon={<IoIosArrowBack style={{ background: "black", fontSize: "30px", padding: "7px", borderRadius: "50%" }} />}
      >
        {images.map((image, id) => {
          return (
            <Carousel.Item interval={1000} key={id}>
              <img
                className="d-block w-100"
                src={image}
                alt="banner_image"
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </Box>
  )
}

export { BannerCarousel };
