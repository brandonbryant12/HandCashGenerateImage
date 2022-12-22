const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './data.db',
    },
    useNullAsDefault: true
  });

let isInitialized = false;

const init = async () => {
    try{
        await knex.schema
          .createTable('prompts', table => {
            table.increments('id');
            table.string('prompt');
            table.string('imageUrl')
            table.string('alias')
            table
              .integer('user_id')
              .unsigned()
              .references('users.id');
          })
    } catch(err) {
        console.log(err);
    }
};

const database = { knex, init, isInitialized };

export default database;