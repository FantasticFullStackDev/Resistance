import React, { useState, useEffect } from 'react';

export default function NanoBar(props) {
    const [currentCount, setCount] = useState(props.time);
    const timer = () => setCount(currentCount - 1);

    useEffect(() => {
        if (currentCount < 0) {
            props.onEnd();
        }
        const id = setInterval(timer, 1000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCount]);

    return <div style={{ background: props.color ? props.color : "#FF5441", width: (100 / props.time) * (props.time - currentCount) + "%", height: "4px", position: "fixed", zIndex: "9999", bottom: '4px', marginLeft: -30 }}>{currentCount}</div>;
};