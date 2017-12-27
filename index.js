var express = require('express')
var app = express()
var path = require('path')
var ejs = require('ejs')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var ALY = require("aliyun-sdk");

var jaq = new ALY.JAQ({
    accessKeyId: 'LTAI9iaALhBM1mzZ',
    secretAccessKey: 'dmwZtAg5h13vYMprfmobBIHLF76d8d',
    endpoint: 'http://jaq.aliyuncs.com',
    apiVersion: '2016-11-23',
});

function aliyunVerify(obj) {
  jaq.afsCheck({
    Platform: 3,//必填参数，请求来源： 1：Android端； 2：iOS端； 3：PC端及其他
    Session: obj.Session,// 必填参数，从前端获取，不可更改 也不一样
    Sig: obj.Sig,// 必填参数，从前端获取，不可更改 每次不一样
    Token: obj.Token,// 必填参数，从前端获取，不可更改 也不一样
    Scene: "login"// 必填参数，从前端获取，不可更改
  }, function (err, data) {
    if (err) {
      //异常
      console.log('error:', err);
      return;
    }
    //此处无异常，但也可能调用失败
    console.log('result:', JSON.stringify(data));
  })
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname , 'view'))

app.get('/', (req, res) => {
  res.render('index', {})
})

app.post('/test', (req, res) => {
  console.log('test coming in')
  // console.log(req.body)
  const  data  = req.body
  console.log('sendData.....--->', data)
  aliyunVerify(data)
  res.send({
    verify: true
  })
})

app.listen('9999', () => {
  console.log('🌎Run At 9999')
})
