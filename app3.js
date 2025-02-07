const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf8'); //lee el archivo README.md
const reactWords = content.match(/React/ig); //busca las palabras React en el archivo, ig significa que es insensible a mayúsculas y minúsculas

const words = content.split(' '); //separa las palabras del archivo
const reactWords2 = words.filter(word => word.toLowerCase().includes('react')); //busca si la palabra React está en el archivo, no toma en cuenta los links

console.log(`The word React appears ${reactWords.length} times`); 
console.log(`The word React appears ${reactWords2.length} times`); 

