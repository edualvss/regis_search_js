const express = require("express"); // Servidor Web
const app = express();
const port = 8000; // Porta do servidor

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enviar o HTML da Página inicial
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// Processa a consulta (rota /search ativada no botão Pesquisar) e envia HTML dos resultados
app.get("/search", (req, res) => {
  console.log("Buscando...");

  const textoConsulta = req.query.busca; // Texto digitado na busca

  const { Client } = require("es7"); // Cliente Elasticsearch
  const client = new Client({ node: "http://127.0.0.1:9200/" });

  // Realiza a busca
  client.search(
    {
      index: "regis",
      body: {
        query: {
          match: { text: textoConsulta },
        },
      },
    },
    (err, result) => {
      console.log("E agora?");
      if (err) {
        res.send("A busca não funcionou: ");
        console.log(err);
      } else {
        console.log(result.body.hits.hits);
        res.send(result.body.hits.hits);
        // AQUI PRECISA MONTAR O HTML DOS RESULTADOS
      }
    }
  );
});

app.listen(port, () => {
  console.log("Servidor on-line");
});
