const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json'; 
const endpointsFiles = ['./src/app.ts'];

const doc = {
    info: {
        title: 'API Amigo Secreto',
        description: 'API para sorteio de amigo secreto'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger doc gerado com sucesso!');
});
