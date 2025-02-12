// console.log(process.env);

const { SHELL, USER, HOMEBREW_PREFIX } = process.env;

// console.table({SHELL,  HOMEBREW_PREFIX});

const characters = ['Goku', 'Vegeta', 'Green Lantern','Trunks'];


const [goku, vegeta, trunks] = characters;
const [g, v, gl, t] = characters; //desestructuración de arreglos

console.log(g);