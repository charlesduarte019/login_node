const knex = require('../../database');
const crypto = require('crypto');
const { update } = require('../../database');

module.exports = {
    async index(req, res) {
        const results = await knex('projects');
        return res.json(results);
    },

    async create(req, res, next) {
        try {
            const { id, title, description, date } = req.body;

            const project = await knex('users')
                .select('*')
                .where('id', id)

            if (!project[0])
                return res.status(400).send({ error: 'ID Error' });

            if (id !== project[0].id)
                return res.status(400).send({ error: 'Invalid ID' });

            const project_id = crypto.randomBytes(5).toString('HEX');
            const created = new Date();
            const updated = new Date();

            const created_at = created;
            const updated_at = updated;

            await knex('projects')
                .insert({
                    id,
                    project_id,
                    title,
                    description,
                    date,
                    created_at,
                    updated_at
                });

            return res.status(201).send({
                project_id,
                title,
                description,
                date
            })

        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params

            await knex('projects')
                .where('project_id', id)
                .del()

            return res.send()
        } catch (error) {
            next(error);
        }
    },

    async profile(req, res, next) {
        try {
            const { id } = req.params
            const results = await knex('projects')
                .select('*')
                .where('id', id);
            return res.json(results);

        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const { title, description, date } = req.body
            const { id } = req.params;

            const updated = new Date();
            const updated_at = updated;

            await knex('projects')
            .update({
                title,
                description,
                date,
                updated_at
            })
            .where('project_id', id)   
            
            return res.send();

        } catch (error) {
            next(error);
        }
    }
}
