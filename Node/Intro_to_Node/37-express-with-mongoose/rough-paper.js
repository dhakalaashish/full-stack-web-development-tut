const mongoose = require('mongoose')
main().then(() => console.log('Mongo Connection Open')).catch(() => console.log('Mongo COnnection Erro'));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/roughWork');
}

const roughSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    education: {
        type: [String],
        enum: ['Bachelors', 'Masters', 'HighSchool', 'Phd']
    },
})

const Rough = new mongoose.model('Rough', roughSchema);

const aashish = new Rough({
    name: 'Aashish',
    age: 23,
    eucation: ['Bachelors'],
})
aashish.save()
    .then(r => console.log(r))
    .catch(e => console.log(e))