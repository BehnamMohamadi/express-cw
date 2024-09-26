const express = require("express");
const {
  join,
  dirname
} = require('path');
const {
  readFileSync
} = require('node:fs');

const data = readFileSync(join(__dirname, "/user-data.json"))
const parsedData = JSON.parse(data)

const app = express()
const host = "127.0.0.1"
const port = 8000

app.get("/", (req, res) => {
  res.status(200);
  res.send("Root Route")
})
app.get("/home", (req, res) => {
  res.status(200);
  res.send("Home Route")
})
app.get("/about", (req, res) => {
  res.status(200);
  res.send("About Route")
})
app.get("/contact", (req, res) => {
  res.status(200);
  res.send("Contact Route")
})

app.get("/get-all-users", (req, res) => {
  res.status(200)
  res.sendFile(join(__dirname, "./user-data.json"))
})

app.get("/admin", (req, res) => {
  res.status(200)
  const adminUsers = parsedData.filter(user => {
    return user.role === "admin"
  })
  res.send(JSON.stringify(adminUsers))
})
app.get("/home-page", (req, res) => {
  res.status(200)
  res.send("<h3> HomePage </h3>")
})
app.get("/image", (req, res) => {
  res.status(200)
  res.sendFile(join(__dirname, "/apple.png"))
})


app.get('/:page', (req, res) => {
  const page = req.params.page;

  const validPages = ['page-1', 'page-2', 'page-3', 'page-4', 'page-5'];

  if (validPages.includes(page)) {
    res.sendFile(join(__dirname, `/view/${page}.html`));
  } else {
    res.status(404).send('Page not found');
  }
});





app.use((req, res, next) => {
  res.status(404)
  res.send("Not-Found")
  next()
})


app.listen(port, host, () => {
  console.log(`you are listening on ${host}:${port}`)
})