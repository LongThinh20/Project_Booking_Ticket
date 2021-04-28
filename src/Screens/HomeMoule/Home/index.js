import React from 'react'
import BoxBooking from '../../../Components/BoxBooking/BoxBooking'
import Carousel from '../../../Components/Carousel'
import ListGroup from '../../../Components/ListGroup'
import MobileApp from '../../../Components/MobileApp'
import ScrollArrow from '../../../Components/ScrollArrow'
import SliderMovie1 from '../../../Components/SliderMovie1'


export default function HomePage(props) {



    return (
        <div>
            <Carousel />
            <BoxBooking />
            <SliderMovie1 />
            <ListGroup />
            <MobileApp />
            <ScrollArrow />
        </div>
    )
}
