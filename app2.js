const fs = require('fs');
const data = fs.readFileSync('README.md', 'utf8'); //lee el archivo README.md

const newData = data.replace(/React/ig, 'Angular'); //reemplaza React por Angular, ig significa que es insensible a mayúsculas y minúsculas

console.log(data);

fs.writeFileSync('README-Angular.md', newData); //escribe el archivo README-Angular.md con el contenido de newData