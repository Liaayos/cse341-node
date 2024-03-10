const { application } = require('express');
const mongodb = require('../data/contacts');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
    const result = await mongodb.getContacts().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
      });

};

const getSingle = async (req, res) => {
   //#swagger.tags=['Users']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getContacts().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
      });

};

const createUser = async (req, res) => {
   //#swagger.tags=['Users']
  const contactId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getContacts().db().collection('contacts').insertOne(user);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user');
  }
};

const updateUser = async (req, res) => {
   //#swagger.tags=['Users']
  const contactId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getContacts().db().collection('contacts').replaceOne({_id: contactId}, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user');
  }
};

const deleteUser = async (req, res) => {
   //#swagger.tags=['Users']
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb.getContacts().db().collection('contacts').deleteOne({_id: contactId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user');
  }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};