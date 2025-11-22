import {useMediaQuery} from 'react-responsive';
import React from "react";

export const Moblie = ({children}) => {
    const isMoblie = useMediaQuery({ maxWidth: 767});
    return <>{isMoblie && children}</>
};
export const Tablet = ({children}) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1200});
    return <>{isTablet && children}</>
};
export const Desktop = ({children}) => {
    const isPc = useMediaQuery({ minWidth: 1201});
    return <>{isPc && children}</>;
};