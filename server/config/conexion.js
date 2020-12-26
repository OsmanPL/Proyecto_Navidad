const oracledb = require('oracledb');

credentials = {
    user: "",
    password: "",
    connectString: ""
}

try {
    oracledb.initOracleClient({libDir: 'C:\\Oracle\\instantclient_19_9'});
} catch (err) {
    console.error('No se puede conectar al cliente!');
}

async function Open(query, binds, autoCommit) {

    let connection = await oracledb.getConnection(credentials);
    let result = await connection.execute(query, binds, { autoCommit });
    connection.release();
    return result;
}

exports.Open = Open;