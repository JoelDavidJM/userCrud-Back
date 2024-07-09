const app = require('./app');
const {exec} = require('child_process');


const PORT = process.env.PORT || 8080;


const main = async() => {
    try{
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
    } catch(error){
        console.log(error);
    }
}

main();
