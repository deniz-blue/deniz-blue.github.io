import TREE from "./tree.gif";

export const ManBackground = () => {
    return (
        <div
            className="pageBackground"
        >
            <div
                className="fullscreen"
                style={{
                    backgroundImage: `url("${TREE}")`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                }}
            />
        </div>
    )
};
