const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      return;
    }
    console.log(data);
  });
}

function webCat(url, filename) {
  axios.get(url)
    .then(response => {
      const content = response.data;
      if (filename) {
        writeToFile(content, filename);
      } else {
        console.log(content);
      }
    })
    .catch(error => {
      console.error(`Error fetching ${url}:\n  ${error}`);
    });
}

function writeToFile(content, filename) {
  fs.writeFile(filename, content, 'utf8', err => {
    if (err) {
      console.error(`Couldn't write ${filename}:\n  ${err}`);
    }
  });
}

const arg = process.argv[2];
if (arg === '--out') {
  const filename = process.argv[3];
  const target = process.argv[4];

  if (!target) {
    console.error("Usage: node step3.js --out output-filename.txt readfile-or-url");
  } else if (target.startsWith('http')) {
    webCat(target, filename);
  } else {
    cat(target);
    if (filename) {
      catWrite(target, filename);
    }
  }
} else {
  if (arg.startsWith('http')) {
    webCat(arg);
  } else {
    cat(arg);
  }
}

