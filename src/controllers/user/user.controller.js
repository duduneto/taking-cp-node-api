const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../../models');

const create = async (request, response) => {
  try {
    const { email, password, firstName, lastName } = request.body;
    const user = await User.findOne({
      where: { email },
    });

    if (user) {
      throw new Error('Usuário já existe');
    }

    const encryptedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const doc_content = {
      email,
      firstName,
      lastName,
      password: encryptedPassword,
    };

    const newUser = await User.create(doc_content);
    delete newUser.dataValues.password
    return response.status(201).json(newUser)
  } catch (error) {
    return response.status(403).json({ error: true, errorMessage: error.message })
  }
};

const login = async (request, response) => {
  try {
    function sleep() {
      return new Promise(function (resolve) {
        setTimeout(resolve, 1000)
      })
    }
    await sleep();
    const user = await User.findOne({
      where: { email: request.body.email },
    });

    if (!!user === false) {
      throw new Error('Senha ou email incorreto');
    }
    const reqPass = crypto.createHash('sha256').update(request.body.password || '').digest('hex');

    if (reqPass !== user.password) {
      throw new Error('Senha ou email incorreto');
    }
    const token = jwt.sign({
      user: {
        userId: user.id,
        email: user.email,
        createdAt: new Date(),
      },
    },
      '123456', //<--------CHAVE SECRETA PARA CRIAR O TOKEN
    );
    delete user.dataValues.password;
    return response.status(200).json({ user, token });
  } catch (error) {
    console.log('Error => ', error)
    return response.status(403).json({ error: true, errorMessage: error.message });
  }
};

const validToken = async (request, response) => {
  try {
    const { token } = request.body;
    jwt.verify(token, '123456', (err, decoded) => {
      if (!err) {
        return response.status(200).json({
          token: token,
          user: decoded.user,
          valid: true
        })
      } else {
        console.log('Token Error err => ', err)
        return response.status(403).json({ error: true, errorMessage: err.message })
      }
    })
  } catch (error) {

  }
}

module.exports = { create, login, validToken }