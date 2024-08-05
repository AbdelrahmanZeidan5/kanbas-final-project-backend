export default function Hello(app) {
    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')
    });
}
