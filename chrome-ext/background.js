chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ greeting: 'Hello, World!' }, () => {
    console.log('Value is set to Hello, World!');
  });
});

