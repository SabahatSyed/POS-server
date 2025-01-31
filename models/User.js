
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const PageAccessSchema = new mongoose.Schema({
  read: { type: Boolean, default: false },
  add: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
});


const userSchema = new mongoose.Schema({
    seqNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    cnic: {
        type: String
    },
    photoURL: {
        type: String
    },
    role: {
        type: String,
        enum: ['SuperAdmin', 'Admin', 'Employee'],
        default: 'Employee'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    pagesAccess: {
        type: Map,
        of: PageAccessSchema,
      },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

    // For Password Reset
    resetPasswordToken: String,
    resetPasswordExpire: Number
}, { timestamps: true });

//                                                      ----------------------------------------------------
//                                                                       HASHING TECHNIQUES
//                                                      ----------------------------------------------------
// // --------------------------------------HASH THE Password BEFORE SAVING IN DB----------------------------------------
// // called before save() call
userSchema.pre('save', function (next) {
    const user = this;

    // if no modification done, dont SALT it
    if (!user.isModified('password')) {
        return next();
    }

    // SALT the password
    // if pass = "admin"
    // SALT will convert it into "adminsdbfjkhsdbkj"
    // 10 shows the length of random generated string
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        // hash the code with the SALT genereated earlier
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            // set the code as hashed from
            user.password = hash;
            next();
        })
    })
});

// // --------------------------------------COMPARE Password WITH HASHED FORM----------------------------------------
userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this; //SALTed code inside mongoDB
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            // incase of error
            if (err) {
                return reject(err);
            }
            // incase passwords dont match
            if (!isMatch) {
                return reject(false);
            }
            // codes matched
            return resolve(true);
        });
    })
}

module.exports = mongoose.model("User", userSchema);