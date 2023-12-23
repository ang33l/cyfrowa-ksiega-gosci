import Image from "next/image";
import React from "react";

const memoImage = React.memo(function memoImage({ src }: { src: string }) {
    console.log(src)
    return (
        <Image
            fill={true}
            quality={50}
            className={"brightness-75 "}
            alt={"Zdjęcie"}
            style={{ objectFit: "cover" }}
            src={src}
        />
    );
});

export default memoImage;
