import React from "react";

function useWindowSize() {

    const isWindow = typeof window === "object";

    const [windowSize, setWindowSize] = React.useState(
        isWindow ? window.innerWidth : undefined
    );

    function changeWindowSize() {
        setWindowSize({ width: window.innerWidth });
    }

    React.useEffect(() => {
        window.addEventListener("resize", changeWindowSize);

        return () => {
            window.removeEventListener("resize", changeWindowSize);
        };
    }, []);


    return windowSize;
}


export default useWindowSize;