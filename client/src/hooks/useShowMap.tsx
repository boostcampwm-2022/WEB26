import ZoomControl from "#components/MapControl/ZoomControl/ZoomControl";
import { LatLng } from "#types/LatLng";
import { MapProps } from "#types/MapProps";
import { getBounds } from "#utils/pathUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import useZoomControl from "./useZoomControl";

const useShowMap = ({ height = "50vh", center, level = 1, runningPath }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const polyLineRef = useRef<kakao.maps.Polyline>();
    const [path] = useState<kakao.maps.LatLng[]>([]);
    const { zoomIn, zoomOut } = useZoomControl(map);

    useEffect(() => {
        if (!container.current) return;
        map.current = new kakao.maps.Map(container.current, {
            center: new kakao.maps.LatLng(center.lat, center.lng),
            level,
        });
        if (!runningPath) return;
        polyLineRef.current = new kakao.maps.Polyline({
            map: map.current,
            path,
        });
        DrawPath(runningPath);
        const pathBounds = getBounds(runningPath);
        const sw = new kakao.maps.LatLng(pathBounds.minLat, pathBounds.minLng);
        const ne = new kakao.maps.LatLng(pathBounds.maxLat, pathBounds.maxLng);
        const mapBounds = new kakao.maps.LatLngBounds(sw, ne);
        map.current.setBounds(mapBounds);
    }, [runningPath, map]);

    const getLaMaByLatLng = (point: LatLng): kakao.maps.LatLng => {
        return new kakao.maps.LatLng(point.lat, point.lng);
    };

    const DrawPath = useCallback(
        async (path: LatLng[] | undefined) => {
            if (!path) {
                return;
            }
            if (!polyLineRef.current) return;
            polyLineRef.current.setPath(path.map((point) => getLaMaByLatLng(point)));
        },
        [polyLineRef],
    );

    return {
        map: map.current,
        path,
        renderMap: () => (
            <div style={{ position: "relative" }}>
                <div ref={container} style={{ width: "100%", height }} />
                <ZoomControl onClickZoomIn={zoomIn} onClickZoomOut={zoomOut} />
            </div>
        ),
    };
};

export default useShowMap;
