chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "search-perplexity",
    title: "Search in Perplexity",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-perplexity" && info.selectionText) {
    try {
      const query = encodeURIComponent(info.selectionText.trim());
      const url = `https://www.perplexity.ai/search?q=${query}`;
      chrome.tabs.create({ url });
    } catch (err) {
      console.error("Error generating Perplexity URL:", err);
    }
  } else {
    console.warn("No text selected or invalid menu item.");
  }
});