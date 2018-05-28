const Promise = require('promise')
const WordPOS = require('wordpos')
const Koa = require('koa')
const Router = require('koa-router')
const got = require('got')

const app = new Koa()
const router = new Router()
const wordpos = new WordPOS() // declare on seperate lines and always after imports

app.experimental = true

router.get('/:type/:artist/:title', async (ctx, next) => {
    const type = ctx.params.type
    const artist = ctx.params.artist
    const title = ctx.params.title
    try {
        if (type === 'adjectives' || type === 'verbs') {
            ctx.body = await getSong(type, artist, title)
            ctx.status = 200
            return next()
        }
        ctx.body = 'Invalid parameter'
        ctx.status = 400
    } catch (err) {
        console.error(err)
        ctx.body = err.message
        ctx.status = 400
    }
})

router.get('/healthz', (ctx, next) => {
    ctx.body = '200 OK'
    ctx.status = 200
})

router.get('/', (ctx, next) => {
    const type = ctx.params.type
    ctx.body = 'Service usage http://<adress>/query_type/artist/title/'
})

async function getSong (type, artist, title) {
    const response = await got('https://api.lyrics.ovh/v1/:' + artist + '/:' + title)
    const lyric = response.body
    const method = (type === 'adjectives' ? 'getAdjectives' : 'getVerbs')
    const words = await wordpos[method](lyric)
    return {
        words,
        artist,
        title,
        type,
    }
}

app
  .use(router.routes())
  .use(router.allowedMethods())

console.log(`Listening on port 8080`)
app.listen(8080)
