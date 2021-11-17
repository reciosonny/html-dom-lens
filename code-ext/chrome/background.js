chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    name: "Default",
  });
});

chrome.storage.local.get(["name"], (data) => {});


chrome.action.onClicked.addListener(async (tab) => {

    chrome.tabs.sendMessage(tab.id, {text: ""}, function(msg) {
      msg = msg || {};

      console.log('message status received from content script: ', msg);
    });
  
    try {
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["./dist/bundle.js"],
      }); //injects foreground script to webpage

      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["./dist/bundle.css"],
      });

    } catch (ex) {
      console.error(ex);
    }
  
});