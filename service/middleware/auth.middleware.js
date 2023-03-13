// // importe o pacote jsonwebtoken
// const jwt = require('jsonwebtoken');

// // middleware para verificar o token de acesso
// exports.verifyToken = (req, res, next) => {

//     // obtém o cabeçalho de autorização da requisição
//     const authHeader = req.headers['authorization'];

//     // separa o token do cabeçalho 'Bearer'
//     const token = authHeader && authHeader.split(' ')[1];

//     // verifica se o token é nulo
//     if (token === null) return res.sendStatus(401).console.log('Token inválido.');

//     // verifica se o token é válido
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
//         // se houver um erro, retorna um erro 401
//         if (err) return res.sendStatus(401).console.log(err, "erro jtw verify token authMiddleware");

//         // adiciona o usuário autenticado ao objeto de requisição
//         req.user = user;

//         // chama o próximo middleware
//         next();
//     })

// };


// // middleware para verificar o token de atualização
// exports.verifyRefreshToken = (req, res, next) => {

//     // obtém o token de atualização do corpo da requisição
//     const { refreshToken } = req.body;

//     // verifica se o token de atualização é nulo
//     if ( refreshToken === null) return res.sendStatus(401).console.log('Token de atualização inválido.');

//     // verifica se o token de atualização é válido
//     jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        
//         // se houver um erro, retorna um erro 401
//         if (err) return res.sendStatus(401).console.log(err, "erro jtw verify refresh authMiddleware");

//         // adiciona o usuário autenticado ao objeto de requisição
//         req.user = user;

//         // chama o próximo middleware
//         next();
//     })

// };


// // Esse código define dois middlewares que são usados para verificar a autenticação e autorização em uma aplicação web.
// // O primeiro middleware verifyToken verifica se o token de acesso enviado pelo cliente é válido, enquanto o segundo middleware verifyRefreshToken 
// // verifica se o token de atualização é válido.

// // Os middlewares utilizam o pacote jsonwebtoken para verificar a validade dos tokens. 
// // Se um token não é válido, o middleware retorna uma resposta HTTP com o status 401 (Não autorizado) indicando que o cliente não está autenticado
// // ou autorizado para acessar o recurso solicitado.

// // Se o token é válido, o middleware adiciona as informações do usuário autenticado ao objeto de requisição req.user e chama o próximo
// //  middleware na cadeia de middlewares ou a rota correspondente ao recurso solicitado.


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
