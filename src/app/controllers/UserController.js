const knex = require('../../database');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = {
    async index(req, res) {
        const results = await knex('users');
        return res.json(results);
    },

    async create(req, res, next) {
        try {
            const { name, senha, email, whatsapp, city, uf } = req.body;
            
            const mail = await knex('users').select('email').where('email', email);

            if(mail.length != 0 && email === mail[0].email) {
                return res.status(400).send({ error: 'User already exist' })
            };

            const id = crypto.randomBytes(4).toString('HEX');
            const alg = 'aes-256-ctr'
            const pwd = 'asdlkj123'
            const cipher = crypto.createCipher(alg, pwd)
            const password = cipher.update(senha, 'utf8', 'hex')

            const created = new Date();
            const updated = new Date();

            const created_at = created;
            const updated_at = updated;

            await knex('users').insert({
                id,
                name,
                password,
                email,
                whatsapp,
                city,
                uf,
                created_at,
                updated_at
            })

            const token = jwt.sign({ id: id }, authConfig.secret, {
                expiresIn: 1200,
            });

            return res.status(201).send({
                id,
                name,
                email,
                password,
                token
            })

        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        try {
            const { name, senha, email, whatsapp, city, uf } = req.body
            const { id } = req.params

            const updated = new Date();
            const updated_at = updated;

            const alg = 'aes-256-ctr'
            const pwd = 'asdlkj123'
            const text = senha
            const cipher = crypto.createCipher(alg, pwd)
            const password = cipher.update(text, 'utf8', 'hex')


            await knex('users')
                .update({
                    name,
                    password,
                    email,
                    whatsapp,
                    city,
                    uf,
                    updated_at
                })
                .where({ id })

            return res.send()



        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params

            await knex('users')
                .where({ id })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },
    
    async auth(req, res) {
        try {
            const { email, senha } = req.body;

            const alg = 'aes-256-ctr'
            const pwd = 'asdlkj123'
            const cipher = crypto.createCipher(alg, pwd)
            const password = cipher.update(senha, 'utf8', 'hex')

            const user = await knex('users')
                .select('*')
                .where('email', email)

            if (!user)
                return res.status(400).json({ error: 'User not found' });


            if (!await (password === user[0].password))
                return res.status(400).send({ error: 'Invalid password' });

            user[0].password = undefined;

             const token = jwt.sign({ id: user[0].id }, authConfig.secret, {
                 expiresIn: 86400,
             });

            res.send({
                user,
                token
            });

        } catch (error) {
            res.status(500).send({ error: 'Internal error' })
        }
    }
}