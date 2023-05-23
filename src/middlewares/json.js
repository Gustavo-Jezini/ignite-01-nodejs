export async function json(req, res) {
  const buffers = []
  
  // Dessa forma só mostra o conteudo após ele ter chegado todo
  
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    req.body = null
  }
  
  res.setHeader('Content-type', 'application/json')
}