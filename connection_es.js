const { Client } = require("es7"); // Cliente Elasticsearch

const client = new Client({ node: "http://127.0.0.1:9200" });
//const client = new Client({ node: "http://localhost:9200" });

textoConsulta = "teste";

async function run() {
  // Realiza a busca

  const result = await client.search({
    index: "regis",
    body: {
      query: {
        match: { text: textoConsulta },
      },
    },
  });

  console.log(result.body.hits.hits);
}

//console.log(run());
run().catch(console.log);
