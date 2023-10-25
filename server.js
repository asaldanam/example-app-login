console.clear()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const port = 8080

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/api/check-session', (req, res) => {
    
    // Esto sería el authGuard handler del back
    const session = JSON.parse(req?.cookies?.session || '{}');
    const now = new Date().getTime();
    const hasExpired = now >= session.expires;

    console.log('Time left', session.expires - now)
    if (isNaN(session.expires) || hasExpired) {
        res.sendStatus(401);
        return;
    }


    res.json({});
})

app.post('/api/login', (req, res) => {
    console.log(req.body)
    // Aqui comprobaría si existe el user:
    const exists = req.body.username === 'sara' && req.body.password === '1234';

    if (exists) {
        const expires = new Date().getTime() + 60_000; // a minute
        const cookie = { username: req.body.username, expires };
        res.cookie('session', JSON.stringify(cookie), { httpOnly: true, secure: true })
        res.json({ success: true });
    } else {
        res.sendStatus(401);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
