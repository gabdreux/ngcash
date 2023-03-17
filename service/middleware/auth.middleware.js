// importe o pacote jsonwebtoken
const jwt = require('jsonwebtoken');

// obtém as chaves secretas do ambiente
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

// middleware para verificar o token de acesso
exports.verifyToken = (req, res, next) => {

    // obtém o cabeçalho de autorização da requisição
    const authHeader = req.headers['authorization'];

    // verifica se o cabeçalho existe e está no formato esperado
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.sendStatus(401).console.log('Token inválido.');
    }

    // separa o token do cabeçalho 'Bearer'
    const token = authHeader.split(' ')[1];

    // verifica se o token é nulo
    if (!token) {
        return res.sendStatus(401)
        console.log('Token inválido.');
    }

    // verifica se o token é válido
    jwt.verify(token, JWT_SECRET, (err, user) => {
        
        // se houver um erro, retorna um erro 401
        if (err) {
            console.error(err);
            return res.sendStatus(401);
        }

        // adiciona o usuário autenticado ao objeto de requisição
        req.user = user;

        // chama o próximo middleware
        next();
    })

};

// middleware para verificar o token de atualização
exports.verifyRefreshToken = (req, res, next) => {

    // obtém o token de atualização do corpo da requisição
    const { refreshToken } = req.body;

    // verifica se o token de atualização é nulo
    if (!refreshToken) {
        return res.sendStatus(401)
        console.log('Token de atualização inválido.');
    }

    // verifica se o token de atualização é válido
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
        
        // se houver um erro, retorna um erro 401
        if (err) {
            console.error(err);
            return res.sendStatus(401);
        }

        // adiciona o usuário autenticado ao objeto de requisição
        req.user = user;

        // chama o próximo middleware
        next();
    })

};
