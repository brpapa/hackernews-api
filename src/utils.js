const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-4w3s0m3'

// recupera o userId através do token da sessão enviado no header 
// ?????? (token esse que foi registrado em runtime quando o usuário logou / cadastrou)
// usar nos resolvers que precisam de autenticação
function getUserId(request) {
  const authHeader = request.get('Authorization')
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    // @ts-ignore
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  getUserId,
  APP_SECRET,
}
