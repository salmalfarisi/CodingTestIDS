const amqp = require("amqplib");

var channel, connection;  //global variables

checkconnection();
async function checkconnection() {
	try {
		connection = await amqp.connect("amqp://guest:guest@localhost:5672" || "amqp://localhost:5672");
		amqp.connect("amqp://guest:guest@localhost:5672" || "amqp://localhost:5672", function (err, conn) { console.log(err) });
        channel    = await connection.createChannel()
        
        await channel.assertQueue("testing")
    } catch (e) {
		//untuk sementara. cek error
		console.log(e.message);
    }
}

async function connectQueue() {
    try {
        connection = await amqp.connect("amqp://guest:guest@localhost:5672");
        channel = await connection.createChannel();
        
        // connect to 'testing', create one if doesnot exist already
        await channel.assertQueue("testing")
        
        channel.consume("testing", data => {
            // console.log(data)
            console.log("Data received : ", `${Buffer.from(data.content)}` );
            channel.ack(data)
        })

    } catch (error) {
        console.log(error)
    }
}

async function sendData (data) {
	connectQueue();
	await channel.sendToQueue("testing", Buffer.from(JSON.stringify(data)));
        
    // close the channel and connection
    await channel.close();
    await connection.close();
}

module.exports = {
    sendData,
}