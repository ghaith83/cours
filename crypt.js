const bcrypt = require('bcrypt');

async function crypt(data){
    //register
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hash_pass = await bcrypt.hash(data,salt);
    console.log(hash_pass)
    //login
    console.log(await bcrypt.compare(data,hash_pass))
}


crypt("1234");