
function convertDataFormat(originalData) {
  const newData = [];
  originalData.forEach(siteData => {
      for (let key in siteData) {
          if (Object.prototype.hasOwnProperty.call(siteData, key)) {
              const visitedSite = key;
              const linksData = siteData[key].links;
              const links = [];
              if (Array.isArray(linksData)) {
                  linksData.forEach(linkData => {
                      if (linkData && typeof linkData === 'object') {
                          const url = linkData.url || '';
                          const occurrences = linkData.occurrences || 0;
                          links.push({ url, occurrences });
                      }
                  });
              }
              newData.push({ visitedSite, links });
          }
      }
  });
  return newData;
}

document.addEventListener('DOMContentLoaded', function () {
    
    console.log("7")
    chrome.storage.local.get('visitedSites', function (data) {
      const hyperlinkDetails = data.visitedSites || [];
      var arr=[];
      arr.push(hyperlinkDetails)

      var newData = convertDataFormat(arr);
      console.log(hyperlinkDetails);

console.log(newData);

console.log(arr)
var tableBody = document.getElementById('tableBody');
const visitedSite = newData[0].visitedSite;
  const links = newData[0].links;

  links.forEach(link => {
    const row = document.createElement('tr');
    const siteCell = document.createElement('td');
    const hyperlinkCell = document.createElement('td');
    const occurrencesCell = document.createElement('td');

    siteCell.textContent = visitedSite;
    const hyperlink = document.createElement('a');
    hyperlink.href = link.url;
    hyperlink.textContent = link.url;
    hyperlinkCell.appendChild(hyperlink);

    occurrencesCell.textContent = link.occurrences;

    row.appendChild(siteCell);
    row.appendChild(hyperlinkCell);
    row.appendChild(occurrencesCell);

    tableBody.appendChild(row);
  });
});

  
    });
  


