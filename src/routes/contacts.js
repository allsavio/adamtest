const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

router.get('/', contactsController.listContacts);
router.post('/', contactsController.createContact);
router.get('/:contactId', contactsController.getContact);
router.put('/:contactId', contactsController.updateContact);
router.delete('/:contactId', contactsController.deleteContact);

module.exports = router;
