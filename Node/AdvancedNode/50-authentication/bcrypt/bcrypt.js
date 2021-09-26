const bcrypt = require('bcrypt')

// const hashPassword = async (password) => {
//     const salt = await bcrypt.genSalt(12)
//     console.log(salt)
//     const hash = await bcrypt.hash(password, salt)
//     console.log(hash)
// }
const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 12)
    console.log(hash)
}

// hashPassword('monkey')

const login = async (password, hashedPassword) => {
    const result = bcrypt.compare(password, hashedPassword)
    if (result) {
        console.log('LOGGED IN!')
    } else {
        console.log('TRY AGAIN!')
    }
}

login('Monkey', '$2b$12$yqhiDPLhJTH9S7t04kcCQOPzRuP9dwoflNlI5Htrrtga5WDCDqe76')

