chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    name: "Default",
  });
});

chrome.storage.local.get(["name"], (data) => {});


chrome.action.onClicked.addListener(async (tab) => {
    console.log('Click Injection');

    chrome.tabs.sendMessage(tab.id, {text: "are_you_there_content_script?"}, function(msg) {
      msg = msg || {};

      console.log('message status received from content script: ', msg);

      // if (msg.status != 'yes') {
      //   chrome.tabs.insertCSS(tabId, {file: "css/mystyle.css"});
      //   chrome.tabs.executeScript(tabId, {file: "js/content.js"});
      // }
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

      // console.log("running async/await pattern");
      // console.log("script injected...", result);

      // chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
      //   console.log('done sending message to content script');
      // });

    } catch (ex) {
      console.error(ex);
    }
  
});

//maybe we should remove this
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // console.log(tab);

  // if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
  //   try {
  //     const result = await chrome.scripting.executeScript({
  //       target: { tabId: tabId },
  //       files: ["./dist/bundle.js"],
  //     }); //injects foreground script to webpage

  //     await chrome.scripting.insertCSS({
  //       target: { tabId: tabId },
  //       files: ["./dist/bundle.css"],
  //     });

  //     console.log("running async/await pattern");
  //     console.log("script injected...", result);
  //   } catch (ex) {
  //     console.error(ex);
  //   }
  // }
});
