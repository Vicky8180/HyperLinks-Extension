

chrome.runtime.onInstalled.addListener(() => {
    
    console.log("1");
    chrome.storage.local.set({ visitedSites: {} }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Initialization successful');
      }
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message.type);
    console.log("3");
    if (message.type === "logLink") {
      logLink(sender, message.url);
    }
  });
  


function logLink(sender, url) {
    chrome.storage.local.get("visitedSites", (data) => {
      console.log(data);
      console.log(sender);
      const visitedSites = data.visitedSites || {};
      console.log(visitedSites);
      const currentSite = visitedSites[sender.origin] || { links: [] };
      console.log(currentSite);

      if (!currentSite.links.includes(url)) {
        currentSite.links.push(url);
      }
  
      visitedSites[sender.origin] = currentSite;
  
      chrome.storage.local.set({ visitedSites }, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log("Data set successfully");
        }
      });
    });
  }
  



  
chrome.runtime.onInstalled.addListener(() => {

  chrome.storage.local.set({ visitedSites: {} }, () => {
      if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
      } else {
          console.log('Initialization successful');
      }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "logLink") {
      logLink(sender, message.url);
  }
});


function logLink(sender, url) {
  chrome.storage.local.get("visitedSites", (data) => {
      const visitedSites = data.visitedSites || {};
      const currentSite = visitedSites[sender.origin] || { links: [] };

    
      const index = currentSite.links.findIndex(link => link.url === url);
      if (index !== -1) {
        
          currentSite.links[index].occurrences++;
      } else {
        
          currentSite.links.push({ url: url, occurrences: 1 });
      }

      visitedSites[sender.origin] = currentSite;

 
      chrome.storage.local.set({ visitedSites }, () => {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
          } else {
              console.log("Data set successfully");
          }
      });
  });
}
