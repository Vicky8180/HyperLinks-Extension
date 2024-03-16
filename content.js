
console.log("This should be logged immediately upon script execution");

var allLinks = document.querySelectorAll('a');

var linksArray = Array.from(allLinks);
if (linksArray.length > 0) {
    console.log(allLinks); 
  console.log(linksArray[0].href);
 
   

} else {
  console.log('No anchor tags found on the page.');
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("14")
    logLinksOnPage();
    console.log("2")
    const observer = new MutationObserver(logLinksOnPage);
    observer.observe(document.body, { subtree: true, childList: true });
  });
  
  function logLinksOnPage() {
    const links = document.querySelectorAll("a");
    console.log(links)
    console.log("13")
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        console.log("got added")
        chrome.runtime.sendMessage({ type: "logLink", url: link.href });
      });
    });
  }
  







