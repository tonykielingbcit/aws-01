const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("build"));


/*********** DATA **************/
let pokemons = [
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
  // if (1) return res.send(null);  // testing error

  // console.log("GET /api/pokemons: ", pokemons);
  res.send({pokemons});
});


app.post("/api/pokemons", (req, res) => {
  // if (1) return res.send(null);  // testing error

  let data = req.body;
  // console.log("req.body:: ", req.body, Object.keys(data).length === 0 , data.constructor === Object);
  if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
    data.id = pokemons.length + 1;
    // console.log("POST /api/pokemons", data);
    pokemons.push(data);
  }
  res.send(data);
});


app.post("/api/clearData", (req, res) => {
  // if (1) return res.send(null); // testing error

  // console.log("----clear:: ", req.body);
  pokemons = [];
  res.send([]);
});



/************* DELIVERS FE ****************/
// After all other routes
app.get('*', (req, res) => {
  res.sendFile('build/index.html');
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));
