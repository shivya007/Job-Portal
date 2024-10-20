import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Java Developer",
    "Data Science",
    "Graphic Designer",
];
const CategoryCarousel = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
      };
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((cat, index)=>(
                        <CarouselItem  key={index}  className="md:basis-1/2 lg:basis-1/3">
                            <Button onClick={()=> searchJobHandler(cat)} variant="outline" className= "rounded-full">{cat}</Button>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious  className="absolute top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 z-10"/>
            <CarouselNext  className="absolute top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 z-10"/>
        </Carousel>
    </div>
  )
}

export default CategoryCarousel