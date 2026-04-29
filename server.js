const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let users = [{ id: 1, username: 'admin', password: '$2a$10$EIXF3ZeE5HBc5Za7G7eloeHz4fFg8Dmy2BP4PP2mh6ZSzLzG/SZTy' }]; // password: admin123

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
        return res.json({ auth: true, token });
    }
    return res.status(401).send('Unauthorized');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});