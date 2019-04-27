
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    birthDate: Date,
    termsAccepted: Boolean,
    termsAcceptedDate: Date
});


UserSchema.pre('save', function(next){
    bcrypt.genSalt(10).then(salt =>
        bcrypt.hash(this.password, salt).then(
            (hash) => {
                this.password = hash;
                next();
            }
        )
    );
});

UserSchema.post('save', function(doc){
    console.log(`===> ${doc.email} account created.`);
});


UserSchema.methods.register = function(){
    return this.save();
};

UserSchema.statics.login = function(email, password){
    return new Promise((resolve, reject) =>
        User.findOne({email}).then(user => {
            if(!user) return reject('User not found');
            bcrypt.compare(password, user.password).then(res => res ? resolve(user) : reject('Wrong password'));
        })
    );
};


const User = mongoose.model('User', UserSchema);

module.exports = User;