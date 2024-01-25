import User from "../database/models/user.model";

async function createUser(details) {
  const user = await User.create(details);
  return user;
}

async function getAllUsers() {
  const users = await User.findAll();
  return users;
}

async function getUserById(id) {
  const user = await User.findByPk(id);
  return user;
}

async function updateUser(updates, id) {
  await User.update(updates, { where: { id: id } });
  const updatedUser = await User.findByPk(id);
  return updatedUser;
}

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

export default {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  getUserByEmail,
};