// const jwt = require('jsonwebtoken')
// var tokenKey = 'zzuggumi'

// const authMiddleware = (req, res, next) => {
//     const token = req.headers['x-access-token'] || req.query.token;
//     console.error(token)
//     if(!token) {
//         return res.status(403).json({
//             success: false,
//             message: 'not logged in'
//         })
//     }

//     const p = new Promise(
//         (resolve, reject) => {
//             jwt.verify(token, tokenKey, (err, decoded) => {
//             //jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
//                 if(err) reject(err)
//                 resolve(decoded)
//             })
//         }
//     )

//     const onError = (error) => {
//         console.log(error);
//         res.status(403).json({
//             success: false,
//             message: error.message
//         })
//     }

//     p.then((decoded)=>{
//         req.decoded = decoded
//         next()
//     }).catch(onError)
// }

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken')
var tokenKey = 'f$i1nt#ec1hT@oke1n!Key'

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;
    console.error(token)
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, tokenKey, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        console.log(error);
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}

module.exports = authMiddleware;