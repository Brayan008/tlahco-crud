const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");//requerido para cifrar

const UserSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{
  timestamps: true
});

UserSchema.methods.encryptPassword = async (password) => { //encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password); //Se compara la contraseña con la base de datos
};

module.exports = model("User", UserSchema);