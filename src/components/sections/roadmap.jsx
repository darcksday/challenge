import React from "react";
import checkIcon from "../../assets/img/check.png";

export const RoadmapSection = ({ date, title, desc, index, type }) => (
  <div
    className={`sm:mb-10 mb-5 sm:flex justify-between w-full ${
      index % 2 === 0
        ? "right-timeline sm:text-left"
        : "flex-row-reverse left-timeline sm:text-right"
    }`}
  >
    <div className="order-1 sm:w-1/2">&nbsp;</div>
    <div
      className={`z-20 bg-white flex items-center  justify-center order-1 text-green-500  w-7 h-7 rounded-full hidden sm:block  `}
    >


      <div className="place-items-center h-full grid">


        {type === "past" && (<i className="material-icons relative font-bold  material-icons text-green-500">check</i>)}

        {type === "soon" && (<i className="material-icons relative font-bold  material-icons text-[#2c93eb]">flag</i>)}
        {type === "incomming" && (<i className="material-icons relative font-bold  material-icons text-gray-500">access_time</i>)}


      </div>


    </div>
    <div
      className={`sm:flex order-1 ${
        index % 2 === 0 ? "justify-start" : "justify-end"
      } rounded-lg  sm:w-1/2 px-7`}
    >
      <div
        className={`w-full lg:w-2/3 border-2 p-5 rounded-lg ${
          type === "past"
            ? "border-green-500"
            : type === "soon"
              ? "border-[#2c93eb]"
              : "border-gray-500"
        }`}
      >
        <div
          className={`mb-3 ${
            type === "past"
              ? "text-green-500"
              : type === "soon"
                ? "text-[#2c93eb]"
                : "text-gray-500"
          }`}
        >
          <h3>{date}</h3>
          <h3 className="font-bold text-xl">{title}</h3>
        </div>
        <p
          className={`text-sm leading-snug tracking-wide ${
            type === "past"
              ? "text-green-500"
              : type === "soon"
                ? "text-[#2c93eb]"
                : "text-gray-500"
          }`}
        >
          {desc}
        </p>
      </div>
    </div>
  </div>
);
