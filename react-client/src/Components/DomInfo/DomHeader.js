import React from "react";

const DomHeader = ({ tag, elementId, classNames, href }) => {
    return (
        <div className="dialog-header">
            <div className="flex-column">
                <div>
                    <span className="label-tag">{tag}</span>
                    {elementId && <span className="">{elementId}</span>}
                    {classNames.map((val) => (
                        <span
                            className={`${val.updated ? "highlight-div" : ""}`}
                        >
                            {val.name}
                        </span>
                    ))}
                </div>
                <span className="dom-header-label">{href}</span>
            </div>
        </div>
    );
};

export default DomHeader;
