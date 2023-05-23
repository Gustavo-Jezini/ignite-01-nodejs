// Espaço para transitar dados de uma maneira rápida
// JavaScript não trabalhava com dados binários, e o buffer usa.

const buf = Buffer.from('OK')

console.log(buf.toJSON())