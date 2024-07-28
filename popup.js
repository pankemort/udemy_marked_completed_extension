// 

document.getElementById('markAllVideosButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['markAllVideos.js']
      });
    });
  });
  
  document.getElementById('markSectionVideosButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['markSectionVideos.js']
      });
    });
  });
  