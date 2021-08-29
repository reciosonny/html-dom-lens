chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    name: "Default",
  });
});

chrome.storage.local.get(["name"], (data) => {});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log(tab);

  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    try {
      const result = await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["./anotherscript.js", "./dist/bundle.js"],
      }); //injects foreground script to webpage

      console.log("running async/await pattern");
      console.log("script injected...", result);
    } catch (ex) {
      console.error(ex);
    }
  }
});

console.log("background here ");