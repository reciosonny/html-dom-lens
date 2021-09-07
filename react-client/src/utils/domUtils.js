

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

module.exports = {
  ancestorExistsByClassName
}