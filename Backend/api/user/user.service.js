
import { dbService } from "../../services/db.service.js";
import { loggerService } from "../../services/logger.service.js";

import { ObjectId } from "mongodb";

export const userService = {
    query,
    getById,
    remove,
    add,
    update,
    getByEmail
};

async function query() {
  try {
    const collection = await dbService.getCollection("user");
    let users = await collection.find().toArray();
    users = users.map((user) => {
      delete user.password;
      user.createdAt = new ObjectId(user._id).getTimestamp();
      return user;
    });
    return users;
  } catch (error) {
    loggerService.error('cannot find users ',error)
    throw error
  }
}

async function getById(userId){
 try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({
      _id: ObjectId.createFromHexString(userId),
    })
    delete user.password
    return user
  } catch (err) {
    loggerService.error(`while finding user ${userId}`, err)
    throw err
  }
}

async function getByEmail(email) {
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ email })
    return user
  } catch (err) {
    loggerService.error(`while finding user ${email}`, err)
    throw err
  }
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection('user')
    await collection.deleteOne({ _id: ObjectId.createFromHexString(userId) })
  } catch (err) {
    loggerService.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

async function update(user) {
  try {
    // peek only updatable fields!
    const userToSave = {
      username: user.username,
      avatar: user.avatar
    }
    const collection = await dbService.getCollection('user')
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    loggerService.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function add(user) {
  try {
    // Validate that there are no such user:
    const existUser = await getByEmail(user.email)
    if (existUser) throw new Error('Username taken')

    // peek only updatable fields!
    const userToAdd = {
      username: user.username,
      password: user.password,
      email: user.email,
      date_of_birth: user.date_of_birth
    }
    const collection = await dbService.getCollection('user')
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    loggerService.error('cannot insert user', err)
    throw err
  }
}
