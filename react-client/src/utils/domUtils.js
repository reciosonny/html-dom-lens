import uuidv4 from 'uuid/dist/v4';

// Recursion algorithm. Performance may be slower so let's improve the tail-recursion algorithm later
// TODO: Offer another function for this one which checks for multiple classNames needed checking
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

function ancestorExistsByClassNames(element, classNames) {
  
  if(!element) return false;
  if(classNames.some(className => className === element.className)) {
    return true;
  }
  if(!element.parentElement) return false;


  if (element.parentElement.className !== className) {
    return ancestorExistsByClassName(element.parentElement, className);
  }

  return true;
}

// This algorithm gets the unique element identifier by using element tag(e.g. p, div, span, input), and the index where that particular element is located
function getUniqueElementIdentifierByTagAndIndex(elTarget) {
  const result = [...document.querySelectorAll(elTarget.tagName.toLowerCase())]
    .reduce((acc, dom, idx) => {
      if (dom === elTarget) {
          acc.elType = dom.tagName.toLowerCase();
          acc.index = idx;
      }

      return acc;
    }, { elType: '', index: 0 });


  return result;
}

// gets element by element tag and index location
function getElementByTagAndIndex(elType, idxToFind) {
  const retrievedElement = [...document.querySelectorAll(elType)]
    .find((dom, idx) => idx === idxToFind);

  return retrievedElement;
}

// removes all customed css from children
function customChildFilter(toFilter) {
  toFilter.map(
    (val) =>
      (val.class = val.class
        .split(" ")
        .filter((customFilter) => !customFilter.includes("custom-css")))
  );

  return toFilter;
}

const colorselection = ["#311B92", "#4527A0", "#512DA8", "#5E35B1", "#673AB7", "#7E57C2", "#9575CD", "#B39DDB", "#D1C4E9", "#EDE7F6", "#E91E63", "#D81B60", "#C2185B", "#AD1457", "#880E4F", "#EC407A", "#F06292", "#F48FB1", "#F8BBD0", "#FCE4EC", "#263238", "#37474F", "#455A64", "#546E7A", "#607D8B", "#78909C", "#90A4AE", "#B0BEC5", "#CFD8DC", "#ECEFF1"];


function extractDomInfo(elTarget) {
  
  const classNames = [...elTarget.classList].map((name) => `.${name}`);
  
  const children = [...elTarget.children].map((child) => {
    return {
      id: child.id ? "#" + child.id : null,
      class: child.className && "." + child.className,
      tag: child.localName,
      element: child
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
    id: elParent.id && `#${elParent.id.trim()}`,
    tag: elParent.localName,    
    class: elParent.className && `.${elParent.className}`,
    classes: [...elParent.classList.value.split(" ").filter(customFilter => !customFilter.includes('custom-css'))]    
  };

  const randomcolor = Math.floor(Math.random() * colorselection.length);
  const dataId = uuidv4();     

  return {
    id: elTarget.id !== "" && `#${elTarget.id.trim()}`,
    domElement: elTarget,
    tag: elTarget.localName,
    classNames,
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
  extractDomInfo,
  getElementByTagAndIndex,
  getUniqueElementIdentifierByTagAndIndex,
  customChildFilter
}