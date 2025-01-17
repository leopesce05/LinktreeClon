import colors from 'colors'
import server from './server'

const port = process.env.PORT || 4000

//INICIAR EL SERVIDOR
server.listen(port, () => {
    console.log(colors.magenta.italic( `Servidor escuchando en el puerto: ${port}`))
})
