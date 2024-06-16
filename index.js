const level = require('level');
const fs = require('fs')
const os = require('os');
const path = require('path');

async function getExtensionData(extensionId, key) {
  let basePath;
  if (os.platform() === 'win32') { // Windows
    basePath = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data', 'Default', 'Local Extension Settings', extensionId);
  } else if (os.platform() === 'darwin') { // macOS
    basePath = path.join(os.homedir(), 'Library', 'Application Support', 'Google', 'Chrome', 'Default', 'Local Extension Settings', extensionId);
  } else if (os.platform() === 'linux') { // Linux
    basePath = path.join(os.homedir(), '.config', 'google-chrome', 'Default', 'Local Extension Settings', extensionId);
  } else {
    throw new Error("Unsupported OS");
  }
  // delete lock file
  if(fs.existsSync(path.join(basePath,"LOCK"))) {
    fs.rmSync(path.join(basePath,"LOCK"))
  }


  // Open the LevelDB database
  const db = new level.Level(basePath);
  db.open((error) => {
    return "Error occured"
  });

  return db.get(key)
    .then(value => {
      db.close();
      return JSON.parse(value);
    })
    .catch(err => {
      db.close();
      if (err.notFound) {
        console.log('No value found for the given key');
      } else {
        console.error('An error occurred:', err);
      }
    });
}

const extensionId = 'giondaolcpoefllfodhhmigedfkkhddo';
const key = 'greeting';

getExtensionData(extensionId, key).then(data => {
  if (data) {
    console.log(`Stored value: ${data}`);
  }
});

