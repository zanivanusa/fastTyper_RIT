import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

// load the config
dotenv.config() 

// mongodb atlas connect
export async function connectToMongoAtlas() {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fasttyper-cluster.ifqfzx4.mongodb.net/fast-typer?retryWrites=true&w=majority`;

    try {
        mongoose.connect(uri, 
            { useNewUrlParser: true, useUnifiedTopology: true }
        ).then(() => console.log("Connected to Mongoose"));
    } catch (e) {
        console.log(`Could not connect Mongoose: ${e}`);
    }
}

// mongodb local-server connect
export async function connectToMongoLocal() {
    var mongoDB = 'mongodb://127.0.0.1/fast-typer';
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
}
