import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '../../Layouts/ScrollArrow.scss'


export default function ScrollArrow() {

   const [showScroll, setShowScroll] = useState(false)

   const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
         setShowScroll(true)
      } else if (showScroll && window.pageYOffset <= 400) {
         setShowScroll(false)
      }
   };

   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   window.addEventListener('scroll', checkScrollTop)

   return (
      <div className="demoScroll ">
         <FaArrowUp className="scrollTop" onClick={scrollTop} style={{height:50, display: showScroll ? 'flex' : 'none' }} />


      </div>
   );
}

