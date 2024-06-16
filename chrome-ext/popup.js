document.getElementById('getValueButton').addEventListener('click', () => {
  chrome.storage.local.get('greeting', (result) => {
    document.getElementById('valueDisplay').textContent = result.greeting;
  });
});

document.getElementById('setValue').addEventListener('click', () => {
  const value = document.getElementById('set-input').value;
  chrome.storage.local.set({'greeting': value},(result) => {
    document.getElementById('valueDisplay').textContent = value;
    console.log("success ", result);
  });
});

