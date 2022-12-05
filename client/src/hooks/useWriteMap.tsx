import LockButton from "#components/MapControl/LockButton/LockButton";
import MapTypeControl from "#components/MapControl/MapTypeControl/MapTypeControl";
import MyPositionButton from "#components/MapControl/MyPositionButton/MyPositionButton";
import PlaceSearch from "#components/MapControl/PlaceSearch/PlaceSearch";
import UndoButton from "#components/MapControl/UndoButton/UndoButton";
import ZoomControl from "#components/MapControl/ZoomControl/ZoomControl";
import { JEJU } from "#constants/location";
import { MapProps } from "#types/MapProps";
import { getCurrentLatLng } from "#utils/locationUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import useDrawCurve from "./useDrawCurve";
import useMapTypeControl from "./useMapTypeControl";
import useMarker from "./useMarker";
import useZoomControl from "./useZoomControl";

const useWriteMap = ({ height = "100vh", level = 1 }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const polyLineRef = useRef<kakao.maps.Polyline>();
    const [path, setPath] = useState<(kakao.maps.LatLng | kakao.maps.LatLng[])[]>([]);
    const [isMapDraggable, setIsMapDraggable] = useState(true);
    const [pathLength, setPathLength] = useState(0);
    const { zoomIn, zoomOut } = useZoomControl(map);
    const { mapType, onClickRoadMap, onClickSkyView } = useMapTypeControl(map);
    const { drawMarker, initMarker } = useMarker();
    const { setDrawCurveEnabled } = useDrawCurve({ container, map, setPath });
    //#region isRoad
    // const { current: roadviewClient } = useRef<kakao.maps.RoadviewClient>(new kakao.maps.RoadviewClient());
    // const checkIsRoad = useCallback((position: kakao.maps.LatLng) => {
    //     return new Promise((resolve) =>
    //         roadviewClient.getNearestPanoId(position, 5, (panoId: any) => {
    //             resolve(!!panoId);
    //         }),
    //     );
    // }, []);
    //#endregion
    useEffect(() => {
        getCurrentLatLng().then((center) => {
            if (!container.current) return;
            map.current = new kakao.maps.Map(container.current, {
                center: new kakao.maps.LatLng(center.lat, center.lng),
                level,
            });
            polyLineRef.current = new kakao.maps.Polyline({
                map: map.current,
                path: [],
            });
            kakao.maps.event.addListener(map.current, "click", onClickMap);
            initMarker(map.current);
        });
    }, []);

    const getExpandedPath = useCallback(() => {
        return path.reduce<kakao.maps.LatLng[]>((acc, cur) => {
            if (Array.isArray(cur)) return [...acc, ...cur];
            return [...acc, cur];
        }, []);
    }, [path]);

    useEffect(() => {
        if (!polyLineRef.current) return;
        setPathLength(polyLineRef.current?.getLength());
    }, [path]);

    useEffect(() => {
        if (!map.current) return;
        if (!container.current) return;
        setDrawCurveEnabled(isMapDraggable);
    }, [isMapDraggable]);

    const onClickMap = useCallback(
        (mouseEvent: kakao.maps.event.MouseEvent) => {
            if (!polyLineRef.current) return;
            setPath((prev) => [...prev, mouseEvent.latLng]);
        },
        [polyLineRef],
    );

    useEffect(() => {
        if (!polyLineRef.current) return;
        const _path = getExpandedPath();
        polyLineRef.current.setPath(_path);
        drawMarker(_path);
    }, [path]);

    const onClickUndo = useCallback(() => {
        if (!polyLineRef.current) return;
        const _path = [...path];
        _path.pop();
        setPath(_path);
    }, [path]);

    const onClickLock = useCallback(() => {
        if (!map.current) return;
        map.current.setDraggable(!map.current.getDraggable());
        setIsMapDraggable((prev) => !prev);
    }, [map]);

    const setCenter = useCallback(
        (position: kakao.maps.LatLng) => {
            if (!map.current) return;
            map.current.setCenter(position);
        },
        [map.current],
    );

    const getCenter = useCallback(() => {
        if (!map.current) return new kakao.maps.LatLng(JEJU.lat, JEJU.lng);
        return map.current.getCenter();
    }, []);

    const onClickMyPositionButton = useCallback(() => {
        getCurrentLatLng().then((center) => {
            if (!map.current) return;
            map.current.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
        });
    }, [map]);

    return {
        map: map.current,
        getPath: getExpandedPath,
        pathLength,
        renderMap: () => (
            <div style={{ position: "relative" }}>
                <div ref={container} style={{ width: "100vw", height }} />
                <ZoomControl onClickZoomIn={zoomIn} onClickZoomOut={zoomOut} />
                <UndoButton onClick={onClickUndo} />
                <LockButton isLocked={!isMapDraggable} onClick={onClickLock} />
                <PlaceSearch setCenter={setCenter} getCenter={getCenter} />
                <MapTypeControl onClickRoadMap={onClickRoadMap} onClickSkyView={onClickSkyView} mapType={mapType} />
                <MyPositionButton onClick={onClickMyPositionButton} />
            </div>
        ),
    };
};

export default useWriteMap;
