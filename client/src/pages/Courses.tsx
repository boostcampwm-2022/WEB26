import React, { useState, useEffect } from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import SelectFilter from "#components/SelectFilter/SelectFilter";
import useFilter from "#hooks/useFilter";
import OnOffFilter from "#components/OnOffFilter/OnOffFilter";
import useOnOffFilter from "#hooks/useOnOffFilter";
import { PLACEHOLDER } from "#constants/placeholder";
import { CLOCK_ICON, LOCATION_ICON } from "#assets/icons";

const DummyCardData = {
    title: "황새울공원 한 바퀴 도는 코스입니다.",
    courseId: 5,
    path: [
        { lat: 126.57091836134346, lng: 33.45090000378721 },
        { lat: 126.57004847387998, lng: 33.450635526049844 },
        { lat: 126.56931524544794, lng: 33.45101165404891 },
        { lat: 126.56932224193068, lng: 33.44959616387136 },
        { lat: 126.5700747443057, lng: 33.449670903389 },
        { lat: 126.570502727405, lng: 33.450123187413496 },
    ],
    pathLength: 3355,
    userId: "gchoi96",
    img: "https://kr.object.ncloudstorage.com/j199/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-11-20%20%EC%98%A4%ED%9B%84%204.01.56.png",
    hCode: "신림동",
};

const Courses = () => {
    return <div></div>;
};
export default Courses;
