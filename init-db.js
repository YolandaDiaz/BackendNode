const readline = require('readline');
const fs = require('fs');
const Anuncio = require('./models/Anuncio');
const Advsinit = "./anuncios.json";

async function main() {
  const continuar = await askingYesNo('¿Estás seguro que quieres borrar la base de datos?')
  if (!continuar) {
    process.exit();
  };
  const connection = require('./lib/connectMongoose');
  await initAnuncios();
  connection.close();
};

main().catch(err => console.log('Hubo un error', err));

function askingYesNo(texto) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.question(texto, respuesta => {
      interface.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  })
};

async function initAnuncios() {
    const result = await Anuncio.deleteMany();
    console.log(`Se han eliminado ${result.deletedCount} anuncios.`);
    const initAdvs = JSON.parse(fs.readFileSync(Advsinit, 'utf8'));
    const inserted = await Anuncio.insertMany(initAdvs);
    console.log(`Se han creado ${inserted.length} anuncios.`)
  };