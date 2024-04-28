import React, { useState, useEffect } from "react";

function Feature({ width, height, url }) {
    const [images, setImages] = useState([]);

    useEffect(() => {

    }, [url]);

    const rows = [];
    for (var i = 0; i < height; i++) {
        const row = [];
        for (var j = 0; j < width; j++) {
            const index = i * width + j;
            if (index < images.length) {
                row.push(<img key={index} src={images[index]} alt={index} />);
            } else {
                row.push(<div key={index} style={{ width: "100px", height: "100px", backgroundColor: "gray" }} />);
            }
        }
        rows.push(
            <div key={i} style={{ display: "flex", marginBottom: "5px" }}>
                {row}
            </div>
        );
    }

    // Render div với height dòng
    return <div>{rows}</div>;
}

export default Feature;
