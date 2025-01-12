/** @format */

import React from "react";

export default function Advertisiment() {
   return (
      <div className="ads-restaurant-frame">
         <video
            className="ads-video"
            autoPlay={true}
            loop
            muted
            playsInline
            data-video-media>
            <source
               type="video/mp4"
               src="/public/video/ads.mp4"
            />
         </video>
      </div>
   );
}
