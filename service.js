var Promise = require('promise')

var WordPOS = require('wordpos'),
  wordpos = new WordPOS()

var Koa = require('koa')
var Router = require('koa-router')

var app = new Koa()
var router = new Router()

const got = require('got')

app.experimental = true

router.get('/:type/:artist/:title', function (ctx, next) {
  return new Promise(function (resolve, reject) {
    var type = ctx.params.type
    var artist = ctx.params.artist
    var title = ctx.params.title
    if (type === 'adjectives' || type === 'verbs') {
      var lera = getsong(type, artist, title)
      lera.then(function (val) {
        ctx.body = val
        resolve()
      })
    } else {
      ctx.body = 'Invalid parameter'
      resolve()
    }
  })
})

router.get('/:type', function (ctx, next) {
  var type = ctx.params.type
  if (type === 'healtzh') {
    ctx.body = '200 OK'
  } else {
    ctx.body = 'Invalid parameter'
  }
})

router.get('/', function (ctx, next) {
  var type = ctx.params.type
    ctx.body = 'Service usage http://<adress>/query_type/artist/title/'

})

router.post('/:type/:artist/:title', function (ctx, next) {
  return new Promise(function (resolve, reject) {
    var type = ctx.params.type
    var artist = ctx.params.artist
    var title = ctx.params.title
    if (type === 'adjectives' || type === 'verbs') {
      var lera = getsong(type, artist, title)
      lera.then(function (val) {
        ctx.body = val
        resolve()
      })
    } else {
      ctx.body = 'Invalid parameter'
      resolve()
    }
  })
})

router.post('/:type', function (ctx, next) {
  var type = ctx.params.type
  if (type === 'healtzh') {
    ctx.body = '200 OK'
  } else {
    ctx.body = 'Invalid parameter'
  }
})

router.post('/', function (ctx, next) {
  var type = ctx.params.type
    ctx.body = 'Service usage http://<address>/query_type/artist/title/'

})

function getsong (type, artist, title) {
  return new Promise(function (resolve, reject) {
    (async () => {
      try {
        const response = await got('https://api.lyrics.ovh/v1/:' + artist + '/:' + title)
        var lyric = response.body
        if (type === 'adjectives') {
          wordpos.getAdjectives(lyric, function (result) {
            var Jresult = '{artist :' + artist + ', tittle : ' + title + ', type:' + type + ', Adjectives :{ ' + result + '}}'
            resolve(JSON.stringify(Jresult))
            // console.log(result);
          })
        } else {
          wordpos.getVerbs(lyric, function (result) {
            var Jresult = '{artist :' + artist + ', tittle : ' + title + ', type:' + type + ', Verbs :{ ' + result + '}}'
            resolve(JSON.stringify(Jresult))
            // console.log(result);
          })
        }
      } catch (error) {
        var resper = error.response.body
        reject(JSON.stringify(resper))
      }
    })()
  })
}

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8080)
