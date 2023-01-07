const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("build"));


/*********** DATA **************/
const pokemons = [
  {
    id: 1,
    name: "Pikachu",
    type: "electric ⚡️",
    level: 99,
    image: "/pikachu.webp"
  }
];


/************ APIs ****************/
app.get("/api/pokemons", (req, res) => {
  console.log("GET /api/pokemons: ", pokemons)
  res.send({pokemons})
});

app.post("/api/pokemons", (req, res) => {
  console.log("req.body:: ", req.body);
  let data = req.body
  data.id = pokemons.length + 1
  console.log("POST /api/pokemons", data)
  pokemons.push(data)
  res.send(data)
});


/************* DELIVERS FE ****************/
// After all other routes
app.get('*', (req, res) => {
  res.sendFile('build/index.html');
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));
