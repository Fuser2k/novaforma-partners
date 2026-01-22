
const bcrypt = require('bcryptjs');

const hash = '$2b$10$tmLuRFEUoRrH4xvJZewmCuc4TKNHu98v21nDT1AiVJ2VcCrBXccwG';
const password = 'Admin123!';

async function check() {
    const match = await bcrypt.compare(password, hash);
    console.log('Match:', match);

    const passwordAlt = 'ChangeMe123!';
    const matchAlt = await bcrypt.compare(passwordAlt, hash);
    console.log('Match Alt:', matchAlt);
}

check();
