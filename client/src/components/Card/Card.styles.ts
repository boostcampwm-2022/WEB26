import { JUSTIFY_CONTENT } from "#types/flexOptions";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow, flexRowSpaceBetween } from "styles/flex";
import { fontMedium, fontSmall } from "styles/font";

export const CardWrapper = styled.div`
    width: 100%;
    background: ${COLOR.WHITE};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    overflow: hidden;
    img {
        width: 100%;
    }
`;
export const Summary = styled.div`
    padding: 2px 8px;
`;

export const CardTitle = styled.p`
    ${fontMedium(COLOR.BLACK, 700)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SummaryBody = styled.div`
    ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    align-items: center;
    div {
        ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
        margin-top: 4px;
        img {
            width: 10px;
            margin-right: 4px;
        }
        span :not(:last-child) {
            margin-right: 8px;
        }
    }
    span {
        ${fontSmall(COLOR.BLACK, 400)};
    }
`;

export const UserIdLabel = styled.span`
    color: ${COLOR.LIGHT_GRAY} !important;
`;

export const PeopleWrapper = styled.div`
    img {
        width: 10px;
        margin-right: 4px;
    }
    span {
        ${fontSmall(COLOR.BLACK, 400)};
    }
`;

export const SummaryHead = styled.div`
    ${flexRowSpaceBetween};
`;

export const TimeWrapper = styled.div`
    span {
        ${fontSmall(COLOR.BLACK, 400)};
    }
`;
