const express = require('express');
const app = express();
const port = 9876;

const fetchNumbers = (type) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let numList = [];
      switch (type) {
        case 'p':
          numList = [2, 3, 5, 7, 11];
          break;
        case 'f':
          numList = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
          break;
        case 'e':
          numList = [2, 4, 6, 8, 10];
          break;
        case 'r':
          numList = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
          break;
        default:
          return reject(new Error('Invalid type'));
      }
      resolve(numList);
    }, Math.floor(Math.random() * 500));
  });
};

let numberStorage = [];
const maxStorageSize = 10;

app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;

  try {
    const fetchedNumbers = await fetchNumbers(type);
    const uniqueNumbers = fetchedNumbers.filter((num) => !numberStorage.includes(num));

    numberStorage = [...numberStorage, ...uniqueNumbers];
    numberStorage = Array.from(new Set(numberStorage));

    if (numberStorage.length > maxStorageSize) {
      numberStorage = numberStorage.slice(-maxStorageSize);
    }

    const average = numberStorage.reduce((sum, num) => sum + num, 0) / numberStorage.length;

    const response = {
      previousState: numberStorage.slice(0, numberStorage.length - uniqueNumbers.length),
      currentState: numberStorage,
      newNumbers: uniqueNumbers,
      average,
    };

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});