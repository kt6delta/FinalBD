//constantes
const db = require("../utils/Conexion")
const personaRouter = require('express').Router()


//obterner personas (todos)
personaRouter.get('/', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT * FROM Persona`)
    } catch (err) {
        return res.send(err.message);
    } finally {
        await db.cerrarConexion(connection)
        if (result.rows.length == 0) {
            return res.send('no hay respuesta')
        } else {
            return res.send(result.rows)
        }
    }
})

//insertar personas
personaRouter.post('/', async (req, res, next) => {
    const body = req.body; //trae el cuerpo de la petición
    if (!body.nombre || !body.apellido || !body.tipoPersona || !body.tipoDoc || !body.nDocumento) { //compueba si alguno de los campos de la petición estan vacios
        return res.status(400).json({
            error: 'información faltante'
        })
    }

    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`insert into persona values ('${body.tipoPersona}','${body.tipoDoc}','${body.nDocumento}','${body.nombre}','${body.apellido}')`)
        await connection.execute(`commit`)
    } catch (err) {
        console.log(err)
        if (err.message.includes('ORA-00001')) {
            console.log('Entrada duplicada, el registro ya existe.')
        }
    } finally {
        await db.cerrarConexion(connection)
        if (!result) {
            return res.status(409).send("La persona ya existe")
        }
        res.status(201).send("Persona creada correctamente")
    }
})

//obtener los clientes
personaRouter.get('/:tipoP', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(
            `SELECT P.nombre||' '||P.apellido cliente, idTipoPersonaFK, idTipoDocFK, nDocumento
            FROM Persona P, tipoPersona TP
            WHERE P.idTipoPersonaFK = TP.idTipoPersona and
            descTipoPersona = '${req.params.tipoP}'`
        )
    } catch (err) {
        return res.send(err.message);
    } finally {
        await db.cerrarConexion(connection)
        if (result.rows.length == 0) {
            return res.send('no hay respuesta')
        } else {
            return res.send(result.rows)
        }
    }
})

//obtener los proveedores
personaRouter.get('/proveedores', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(
            `SELECT P.nombre||' '||P.apellido cliente, idTipoPersonaFK, idTipoDocFK, nDocumento
            FROM Persona P, tipoPersona TP
            WHERE P.idTipoPersonaFK = TP.idTipoPersona and
            descTipoPersona = 'Proveedor'`
        )
    } catch (err) {
        return res.send(err.message);
    } finally {
        await db.cerrarConexion(connection)
        if (result.rows.length == 0) {
            return res.send('no hay respuesta')
        } else {
            return res.send(result.rows)
        }
    }
})

//obterner persona (uno solo)
personaRouter.get('/:tipoDoc/:nDoc', async (req, res) => {
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`SELECT * FROM persona WHERE IdTipoDoc = '${req.params.tipoDoc}' AND nDocumento = '${req.params.nDoc}'`)
    } catch (err) {
        return res.send(err.message);
    } finally {
        await db.cerrarConexion(connection)
        if (result.rows.length == 0) {
            return res.send('no hay respuesta')
        } else {
            return res.send(result.rows)
        }
    }
})

//Actualizar persona (solo uno)
personaRouter.put('/:tipoDoc/:nDoc', async (req, res) => {
    const body = req.body; //trae el cuerpo de la petición
    if (!body.nombre || !body.apellido || !body.direccion || !body.correo || !body.celular) { //compueba si alguno de los campos de la petición estan vacios
        return res.status(400).json({
            error: 'información faltante'
        })
    }
    let result;
    try {
        connection = await db.abrirConexion()
        result = await connection.execute(`UPDATE persona SET nombre = '${body.nombre}' , apellido = '${body.apellido}' , direccion = '${body.direccion}' , correo = '${body.correo}' , celular = '${body.celular}' WHERE IdTipoDoc = '${req.params.tipoDoc}' AND nDocumento = '${req.params.nDoc}'`)
        await connection.execute(`commit`)
    } catch (err) {
        console.log(err)
    } finally {
        await db.cerrarConexion(connection)
        //en caso de que se pierda la conexión
        if (!result) {
            return res.status(500).send("no se pudo realizar la petición")
        }
        //en caso de que no se haya encontrado a la persona
        if (result.rowsAffected == 0) {
            return res.status(404).send("no se ha encontrado la persona para actualizar")
        }
        //todo se ha realizado perfectamente
        res.status(200).send("Persona actualizada correctamente")
    }
})



module.exports = personaRouter