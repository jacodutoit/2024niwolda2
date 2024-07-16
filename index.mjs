import * as fs from 'node:fs';

const html = fs.readFileSync('index.html', { encoding: 'utf8' });

export async function handler(event) {
    let modifiedHTML = dynamicForm(html, event.queryStringParameters);
    
    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: modifiedHTML,
    };
    return response;
}

function dynamicForm(html, queryStringParameters) {
    let name = '';
    let email = '';
    if (queryStringParameters) {
        if (queryStringParameters.name && queryStringParameters.email) {
            name = queryStringParameters.name;
            email = queryStringParameters.email;
        }
    }
    let newHTML = html.replace('<label for="outputName">Name:</label>', '<label for="outputName">Name: ' + name + '</label>');
    return newHTML.replace('<label for="outputEmail">Email:</label>', '<label for="outputEmail">Email: ' + email + '</label>');
}
