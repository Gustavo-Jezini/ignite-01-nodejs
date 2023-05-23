// { "users": [...]}
import fs from 'node:fs/promises'

// console.log(import.meta.url); // file:///C:/Users/gujez/OneDrive/%C3%81rea%20de%20Trabalho/ignite/01-fundamentos-nodejs/src/server.js

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  // Ao colocar a hashtag na propriedade ela se torna privada
  // e não pode ser acessada por arquivos externos
  #database = {}
  
  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
        // Se o arquivo não existir da erro
      }).catch(() => {
        // No caso de erro, ele cria o arquivo
        this.#persist()
      })
  }
  
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }
  
  select(table, search) {
    let data = this.#database[table] ?? []
    
    if (search) {
      data = data.filter(row => {
        
        // { search: 'Gustavo', page: '2' }
        // Object.entries -> [['search', 'Gustavo'], ['page', '2'] ]
         
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    
    return data
  }
  
  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      // "Array.isArray()": É uma função embutida do JavaScript que verifica se um determinado valor é uma matriz (array). Ela retorna true se o valor passado como argumento for uma matriz e false caso contrário.
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    
    this.#persist();
    
    return data;
    
  }
  
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
    
    
  }
  
  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }
  }
  
}

