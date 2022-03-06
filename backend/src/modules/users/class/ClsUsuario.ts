import { FieldPacket, RowDataPacket } from 'mysql2';

//Lib
import { encryptPassword, matchPassword } from '../../../lib/helpers'

//Database
import { connect } from "../../../database";

// Interfaces
import { IUsuario } from '../interface/IUsuario';
import { IValidacion } from "../../../interface/IValidacion";

class ClsUsuario {
    async VerificarLogin(username: string, password: string) {
        const conn = await connect();
        const sql = `CALL SP_GET_USER(?);`
        const data: [RowDataPacket[][], FieldPacket[]] = await conn.query(sql, [username]);
        const Usuario = data[0][0][0]
        await conn.end();
        if (!Usuario) return { mensaje: "El nombre de usuario no está registrado", vali: false, Usuario: {} }
        if (Usuario.enabled === 0) return { mensaje: "Estás deshabilitado", vali: false, Usuario: {} }
        if (!await matchPassword(password, Usuario.password)) return { mensaje: "Contraseña incorrecta", vali: false, Usuario: {} }
        return { mensaje: "Verificado", vali: true, Usuario };
    }
    async registrarPersona(username: string, password: string) {
        const conn = await connect();
        const sql = `CALL SP_CREATE_USER(?,?);`;
        password = await encryptPassword(password);
        await conn.query(sql, [username, password]);
        const sql2 = `CALL SP_GET_USER(?);`
        const data2: [RowDataPacket[][], FieldPacket[]] = await conn.query(sql2, [username]);
        const Usuario = data2[0][0][0]
        await conn.end();
        return Usuario ;

    }
}
export default new ClsUsuario();