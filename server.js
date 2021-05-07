const express = require('express')
const { resolve } = require('path')

const app = express()

app.use(express.static(path.join(__dirname, './build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(process.env.PORT || 8000, (error) => {
  if(error) {return console.log(error)}

  return console.log('tudo certo')
})