import useCardMap from "#hooks/useCardMap";
import { LatLng } from "#types/LatLng";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CardWrapper, Summary } from "./Card.styles";

interface CardProps {
    img: string;
    to: string;
    children: ReactNode;
    path: LatLng[];
}

const Card = ({ img, to, children, path }: CardProps) => {
    const navigate = useNavigate();
    const { renderMap } = useCardMap({ runningPath: path });
    return (
        <CardWrapper onClick={() => navigate(to)}>
            {renderMap()}
            <img src={img} />
            <Summary>{children}</Summary>
        </CardWrapper>
    );
};

export default Card;
