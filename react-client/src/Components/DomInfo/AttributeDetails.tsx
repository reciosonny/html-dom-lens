import React from "react";

interface Props {
  dataAttributes: any
}

const AttributeDetails = (props: Props) => {
  const [seeMoreAttr, setSeeMoreAttr] = React.useState(true);
  const handleSeeMoreAttr = () => {
    setSeeMoreAttr(!seeMoreAttr);
  };

  const numAttibToDisplay = !seeMoreAttr ? props.dataAttributes.length : 2;
  const attrleftover = props.dataAttributes.length - 2;
  return (
    <>
      <div className="dialog-label">data-* attributes </div>
      <div className="dialog-list">
        {props.dataAttributes.slice(0, numAttibToDisplay).map((val: any) => (
          <div className="list-container">
            <div className="list-items">{val.key}</div>
            <div className="list-items">{val.value}</div>
          </div>
        ))}
      </div>
      {props.dataAttributes.length > 2 && (
        <div id="closeDom" className="see-more" onClick={handleSeeMoreAttr}>
          {seeMoreAttr ? `... ${attrleftover} more` : `... see less`}
        </div>
      )}
    </>
  );
};

export default AttributeDetails;
