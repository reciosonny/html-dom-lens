

const onMessageEvent = (fn) => {
  
  console.log('injecting chrome onMessage event');
  
  /**
   * Sample function: function (msg, sender, sendResponse) { }
   */
  chrome.runtime.onMessage.addListener(fn);
}



export {
  onMessageEvent
}