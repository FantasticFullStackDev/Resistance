const { createServer } = require('https')
const fs = require('fs');
const { parse } = require('url')
const next = require('next')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
    // ca: [fs.readFileSync('./rootCA.pem')]
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(3000, (err) => {
        if (err) throw err
        console.log("> Ready on https://localhost:3000")
    })
})