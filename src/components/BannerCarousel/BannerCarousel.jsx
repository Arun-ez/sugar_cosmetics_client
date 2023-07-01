import './BannerCarousel.css';
import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const BannerCarousel = ({ w, m, images }) => {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = () => {

    setActiveIndex((prevIndex) => {

      if (prevIndex < images.length - 1) {
        return prevIndex + 1
      }

      return 0;

    })
  }

  return (
    <Box w={w} m={m} mb={[4, 8, 12, 12]}>
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleChange}
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

      <Flex justifyContent={'center'} gap={[1, 2, 2, 2]} mt={[2, 4, 4, 4]}>

        {images.map((elm, idx) => {
          return (
            <Box
              key={idx}
              h={[1, 2, 2, 2]} w={[1, 2, 2, 2]}
              cursor={'pointer'}
              borderRadius={'50%'}
              bg={activeIndex === idx ? 'gray.800' : 'gray.300'}
              onClick={() => { setActiveIndex(idx) }}
            >

            </Box>
          )
        })}

      </Flex>
    </Box>
  )
}

export { BannerCarousel };
