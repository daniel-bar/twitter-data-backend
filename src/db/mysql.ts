import mysql from 'mysql';

// import ServerGlobal from '../server-global';

mongoose.connect(process.env.DB_ENDPOINT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => {
        ServerGlobal.getInstance().logger.info('MongoDB database connection done successfully');
    })
    .catch((e: mongoose.Error) => {
        ServerGlobal.getInstance().logger.error(`MongoDB database connection has failed with error: ${e}`);
    });