const models = require('../../models');

// Add new Role
module.exports.create = async function (req, res) {
  try {
    console.log('Request body:', req.body);
    const { name, status = 1 } = req.body; 
    if (!name || !name.trim()) {
      return res.status(400).send({ status: false, error: 'Name is required' });
    }
    const role = await models.UserRole.create({
      name: name, 
      status: status 
    });
    res.status(201).send({
      status: true,
      data: {
        id: role.id,
        name: role.name,
        status: role.status 
      }
    });
  } catch (error) {
    console.error('Error adding role:', error);
    res.status(400).send({ status: false, error: error.message || 'Failed to add role' });
  }
};

// Get All Roles
module.exports.get = async function (req, res) {
  try {
    const roles = await models.UserRole.findAll({
      attributes: ['id', 'name', 'status'] 
    });
    const mappedRoles = roles.map(role => ({
      id: role.id,
      name: role.name, 
      status: role.status 
    }));
    res.send({ status: true, data: mappedRoles });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

// Get Role by ID
module.exports.getById = async function (req, res) {
  try {
    const { id } = req.params;
    const role = await models.UserRole.findByPk(id, {
      attributes: ['id', 'name', 'status'] 
    });
    if (!role) {
      return res.status(404).send({ status: false, error: 'Role not found' });
    }
    res.send({
      status: true,
      data: {
        id: role.id,
        name: role.name, 
        status: role.status 
      }
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

// Update Role
module.exports.update = async function (req, res) {
  try {
    const { id } = req.params;
    const { name, status } = req.body; 
    if (!name || !name.trim()) {
      return res.status(400).send({ status: false, error: 'Name is required' });
    }
    const role = await models.UserRole.findByPk(id);
    if (!role) {
      return res.status(404).send({ status: false, error: 'Role not found' });
    }
    await role.update({
      name: name, 
      status: status 
    });
    res.send({
      status: true,
      data: {
        id: role.id,
        name: role.name, 
        status: role.status
      }
    });
  } catch (error) {
    res.status(400).send({ status: false, error: error.message });
  }
};

// Delete Role
module.exports.delete = async function (req, res) {
  try {
    const { id } = req.params;
    const role = await models.UserRole.findByPk(id);
    if (!role) {
      return res.status(404).send({ status: false, error: 'Role not found' });
    }
    await role.destroy();
    const remainingRoles = await models.UserRole.count(); 
    if (remainingRoles === 0) {
      await req.sequelize.query('ALTER SEQUENCE "UserRoles_id_seq" RESTART WITH 1;');
    }
    res.status(204).send({ status: true });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};
