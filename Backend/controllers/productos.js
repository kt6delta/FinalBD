//constantes
const db = require("../utils/Conexion")
const productoRouter = require('express').Router()


//obterner producto (por codigo)
productoRouter.get('/:cod', async (req, res) => {
  let result;
  try {
    connection = await db.abrirConexion()
    result = await connection.execute(
      `SELECT *
      FROM producto P
      WHERE P.refProducto = ${req.params.cod}`
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

//verificar existencia de producto
productoRouter.get('/existencia/:cod', async (req, res) => {
  let result;
  try {
    connection = await db.abrirConexion()
    result = await connection.execute(
      `SELECT existencia
        FROM Inventario
        WHERE refProductoFK = ${req.params.cod} and
        consecInven = (SELECT max(consecInven)
                      FROM Inventario
                      WHERE refProductoFK = ${req.params.cod})`
    )
  } catch (err) {
    return res.send(err.message);
  } finally {
    await db.cerrarConexion(connection)
    if (result.rows.length == 0) {
      return res.send("Sin existencia")
    } else {
      return res.send(result.rows[0])
    }
  }
})

module.exports = productoRouter;