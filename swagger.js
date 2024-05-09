const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'MERN Quiz Web Application',
    version: '1.0.0',
    description: 'API documentation for the MERN Quiz Web Application',
  },
  servers: [
    {
      url: 'https://answer-vze7.onrender.com',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;