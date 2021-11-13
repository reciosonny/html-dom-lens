import uuidv4 from 'uuid/v4';

// Recursion algorithm. Performance may be slower so let's improve the tail-recursion algorithm later
function ancestorExistsByClassName(element, className) {
  
  if(!element) return false;
  if(element.className === className) {
    return true;
  }
  if(!element.parentElement) return false;


  if (element.parentElement.className !== className) {
    return ancestorExistsByClassName(element.parentElement, className);
  }

  return true;
}

const colorselection = ["#311B92", "#4527A0", "#512DA8", "#5E35B1", "#673AB7", "#7E57C2", "#9575CD", "#B39DDB", "#D1C4E9", "#EDE7F6", "#E91E63", "#D81B60", "#C2185B", "#AD1457", "#880E4F", "#EC407A", "#F06292", "#F48FB1", "#F8BBD0", "#FCE4EC", "#263238", "#37474F", "#455A64", "#546E7A", "#607D8B", "#78909C", "#90A4AE", "#B0BEC5", "#CFD8DC", "#ECEFF1"];


function extractDomInfo(elTarget) {
  
  const clsArr = [...elTarget.classList].map((cls) => ({
    clsName: `.${cls}`,
  }));

  const children = [...elTarget.children].map((child) => {
    return {
      id: child.id.trim() ? "#" + child.id : null,
      class: child.className.trim() ? "." + child.className : null,
      tag: child.localName,
    };
  });


  const dataAttributes = Object.entries(elTarget.dataset).reduce((arr, [key, value]) => arr.concat([{ key, value }]), []);
    
  const elComputedStyle = ["font-size", "color", "font-family"].reduce(
    (init, curr) => ({
      ...init,
      [curr]: window
        .getComputedStyle(elTarget, null)
        .getPropertyValue(curr),
    }),
    {}
  );

  const rgbArr = elComputedStyle["color"]
    .substring(4)
    .slice(0, -1)
    .split(",");

  const colorhex = rgbArr.reduce(
    (init, curr) => (init += parseInt(curr).toString(16)),
    "#"
  );
  
  const elParent = elTarget.parentElement;
  const parent = {
    id: elParent.id.trim() && `#${elParent.id.trim()}`,
    tag: elParent.localName,
    class: elParent.className.trim() && `.${elParent.className.trim()}`,
    classes: [...elParent.classList]
  };

  const randomcolor = Math.floor(Math.random() * colorselection.length);
  const dataId = uuidv4();     

  return {
    id: elTarget.id.trim() !== "" && `#${elTarget.id.trim()}`,              
    clstag: elTarget.localName,
    clsname: clsArr,
    children: children,
    parent,
    size: elComputedStyle["font-size"],
    textcolor: colorhex,
    family: elComputedStyle["font-family"].replaceAll('"', ''),
    bordercolor: colorselection[randomcolor],
    uniqueID: dataId,
    dataId: dataId,
    attributes: dataAttributes                         
  };
}



export {
  ancestorExistsByClassName,
  extractDomInfo
}