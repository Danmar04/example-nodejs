const users = ['User1'];
const requestHandler = (request, response) => {
    const url = request.url;
    const method = request.method;
    if (url === '/') {
        response.write('<html>');
        response.write('<head><title>Enter message</title></head>');
        response.write('<body>Enter new users:<form action="/create-user" method="POST" > <input name="new-user" type="text"><button type="submit">Send</button></input></form ></body > ');
        response.write('</html>');
        return response.end();
    }
    if (url === '/users') {
        response.write('<html>');
        response.write('<head><title>List of users</title></head>');
        response.write('<body><div>List of users:</div>');
        response.write('<ul>');
        for (let user of users) {
            response.write('<li>' + user + '</li>');
        }
        response.write('</ul>');
        response.write('</html>');
        return response.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        request.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const messageBody = parsedBody.split("=")[1];
            users.push(messageBody);
            console.log(users);

        });
        response.statusCode = 302;
        response.setHeader('Location', '/');
        response.end();

    }
};

module.exports = requestHandler;