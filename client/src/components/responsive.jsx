import {useMediaQuery} from 'react-responsive';
import React from "react";

export const MoblieHeader = ({children}) => {
    const isMoblie = useMediaQuery({
        query: "(max-width: 800px)"
    });

    return <>{isMoblie && children}</>
}

export const PcHeader = ({children}) => {
    const isPc = useMediaQuery({
        query: "(min-width: 801px)"
    });

    return <>{isPc && children}</>;
}