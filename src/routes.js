import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

// EXISTEM 3 FORMAS DE ENVIAR INFORMAÇÕES
// Query Paramenters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Paramenters: Identificação de recurso
// Request Body: Envio de informções de um formulário (HTTPs)

// http://localhost:3333/users?userId=1
// GET http://localhost:3333/users/1
// POST http://localhost:3333/users

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      // Não pode retornar uma string, e nesse momento users = []
      // return res.end(users)
      
      const { search } = req.query
        
      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)
      
      return res
        .end(JSON.stringify(users))
      }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      
      const { name, email } = req.body
      
      const user = ({
        id: randomUUID(),
        name,
        email
      })
      
      database.insert('users', user)
        
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body
      
      const user = ({
        name,
        email
      })
      
      database.update('users', id, user)
        
      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      
      database.delete('users', id)
      
      return res.writeHead(204).end()
    }
  },
]