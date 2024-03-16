document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("visitedSites", (data) => {
      const visitedSites = data.visitedSites || {};
      const totalSites = Object.keys(visitedSites).length;
      let totalLinks = 0;
      console.log(data)

     
      for (const site in visitedSites) {
        totalLinks += visitedSites[site].links.length;
        console.log("11")
      }
      console.log("5")
      var allLinks = document.querySelectorAll('a')
      console.log(allLinks)


  
      document.getElementById("totalSites").innerText = totalSites;
      document.getElementById("totalLinks").innerText = totalLinks;
    });
    console.log("6")
    document.getElementById("showDetails").addEventListener("click", () => {
      chrome.tabs.create({ url: "details.html" });
      console.log("10")
    });
  });
  

//   chrome.runtime.onInstalled.addListener(() => {
//     // Initialize storage
//     console.log("1")
//     // chrome.storage.local.set({ visitedSites: {} });

//     chrome.storage.local.set({ 'hyperlinkDetails': data}, function () {
//         if (chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError);
//         } else {
//           console.log('Data saved to Chrome Storage successfully');
//         }
//       })

//   });
