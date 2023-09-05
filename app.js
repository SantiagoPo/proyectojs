const colors = require('colors');
const inquirer = require('inquirer');
const { mostrarMenu } = require('./helpers/mensaje');
const { inquirerMenu, pausa, read } = require('./helpers/inquirer');
const { guardarDB } = require('./helpers/guardarArchivo');
const { preguntaBorrar } = require('./helpers/PreguntaBorrar');
const Tareas = require('./models/tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const { desc, completa } = await read();
                tareas.crearTarea(desc, completa);
                break;
            case '2':
                console.log(tareas.listarTareas());
                break;
            case '3':
                const tareasCompletas = tareas.listarTareasCompletas();
                console.log(tareasCompletas);
                break;
            case '4':
                const tareasPendientes = tareas.listarTareasPendientes();
                console.log(tareasPendientes);
                break;

            case '5':
                const tareaCompletar = await read();
                const tareaCompletada = tareas.completarTarea(tareaCompletar.desc);
                if (tareaCompletada) {
                    console.log(`Tarea "${tareaCompletada.desc}" completada.`);
                } else {
                    console.log('No se encontró ninguna tarea con esa descripción.');
                }
                break;
            case '6':
                const tareaBorrar = await read();
                const confirmacion = await inquirer.prompt(preguntaBorrar);
                if (confirmacion.confirmar) {
                    const tareaBorrada = tareas.borrarTarea(tareaBorrar.desc);
                    if (tareaBorrada) {
                        console.log(`Tarea "${tareaBorrada.desc}" borrada.`);
                    } else {
                        console.log('No se encontró ninguna tarea con esa descripción.');
                    }
                } else {
                    console.log('Operación cancelada.');
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listarTareas());

        await pausa();
    } while (opt !== '0');
}

main();
