const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      return;
    }
    console.log(data);
  });
}

const filePath = process.argv[2];
if (filePath) {
  cat(filePath);
}
