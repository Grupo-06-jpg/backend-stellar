const express = require('express');
const StellarSdk = require('stellar-sdk'); // Aquí estás usando el SDK instalado correctamente
const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola desde el backend!');
});

// Ruta para consultar saldo de una cuenta de Stellar
app.get('/saldo', async (req, res) => {
    const StellarSdk = require('@stellar/stellar-sdk');
    const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    
    // Clave pública de tu cuenta en Stellar
    const publicKey = 'GCINWC36NQJA5VJIIFGH535KDLA3UKD54IZSDFILZBQ4HZLQ2VELNMW'; // Reemplázala por tu clave pública
    
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
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});