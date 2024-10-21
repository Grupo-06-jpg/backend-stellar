const express = require('express');
const StellarSdk = require('stellar-sdk'); // Aquí estás usando el SDK instalado correctamente
const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola desde el backend!');
  });  
// Ruta para consultar el saldo
app.get('/saldo', async (req, res) => {
  // Importa el módulo de Stellar SDK
  const { Server } = require('stellar-sdk');

  // Instancia del servidor
  const server = new Server('https://horizon-testnet.stellar.org');

  // Clave pública de la cuenta que quieres consultar
  const publicKey = 'GCINWC36NQJA5VJIIFGH535KDLA3UKD54IZSDFILZBQ4HZLQ2VELNMW'; // La clave pública de la Cuenta Distribuidora

  try {
    // Carga la cuenta usando la clave pública
    const account = await server.loadAccount(publicKey);
    
    // Mapea los saldos disponibles
    const balances = account.balances.map(balance => ({
      tipo: balance.asset_type,
      saldo: balance.balance
    }));

    // Enviar la respuesta con los balances
    res.json({ publicKey, balances });
  } catch (error) {
    // Enviar error si hay algún problema al consultar el saldo
    res.status(500).send(`Error al consultar el saldo: ${error.message}`);
  }
});

// Configurar el puerto
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});