const inquirer = require('inquirer');
require('colors');

const preguntas = {
    type: 'list',
    name: 'opcion',
    message: '¿Qué deseas hacer?',
    choices: [
        {
            value: '1',
            name: `${'1. '.red}${'Crear tarea'.gray}`
        },
        {
            value: '2',
            name: `${'2. '.red}${'Listar tareas'.gray}`
        },
        {
            value: '3',
            name: `${'3. '.red}${'Listar tareas completas'.gray}`
        },
        {
            value: '4',
            name: `${'4. '.red}${'Listar tareas pendientes'.gray}`
        },
        {
            value: '5',
            name: `${'5. '.red}${'Completar tarea'.gray}`
        },
        {
            value: '6',
            name: `${'6. '.red}${'Borrar tarea'.gray}`
        },
        {
            value: '0',
            name: `${'0. '.red}${'Salir'.gray}`
        }
    ]
};

const inquirerMenu = async () => {
    console.log('============================'.cyan);
    console.log('|           Menu           |'.rainbow);
    console.log('============================'.cyan);

    let opt = '';

    await inquirer.prompt(preguntas).then(data => {
        opt = data['opcion'];
    });

    return opt;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar\n`
        }
    ];
    let pau = '';
    console.log('\n');
    await inquirer.prompt(question).then(data => {
        pau = data['enter'];
    });
    return pau;
}

const read = async () => {
    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message: 'Descripción:',
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor, ingrese un valor';
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'completa',
            message: '¿La tarea está completa?',
            choices: [
                {
                    value: true,
                    name: 'Sí',
                },
                {
                    value: false,
                    name: 'No',
                },
            ],
        },
    ];

    const respuestas = await inquirer.prompt(pregunta);
    return {
        desc: respuestas.desc,
        completa: respuestas.completa,
    };
}

module.exports = {
    inquirerMenu,
    pausa,
    read
}
