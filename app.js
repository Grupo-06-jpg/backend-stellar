
const express = require('express');
const StellarSdk = require('@stellar/stellar-sdk');
const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola desde el backend!');
});

// Ruta para consultar saldo de una cuenta de Stellar
app.get('/saldo', async (req, res) => {
    const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    
    // Clave pública de tu cuenta
    const publicKey = ' GDJJIG7PLM6TQTP33ZF6RCZNYBISGTSV35FZJQ4JJQ5F7ULFE5Z2NM4N ';  // Reemplaza por la clave pública que quieras consultar

    try {
        const account = await server.loadAccount(publicKey);
        const balances = account.balances.map(balance => ({
            tipo: balance.asset_type,
            saldo: balance.balance
        }));
        res.json({ publicKey, balances });
    } catch (error) {
        res.status(500).send(`Error al consultar el saldo: ${error.message}`);
    }
});

// Configurar el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});