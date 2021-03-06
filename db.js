const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'menu_escolar',
  port: 5432,
  password: '1234',
  max: 20,
  min: 2,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000
})

async function get_user(email) {
  const client = await pool.connect()

  const { rows } = await client.query({
    text: 'select * from schools where email=$1',
    values: [email]
  })

  client.release()

  return rows[0]
}

async function create_user(name, email, password) {
  const client = await pool.connect()

  await client.query({
    text: 'insert into schools (name, email, password) values ($1, $2, $3)',
    values: [name, email, password]
  })

  client.release()

}

async function add_menu(vegetariano,calorico,celiaco,autoctono,estandard,fecha,school){
  const client = await pool.connect() 

  await client.query({
    text: 'insert into orders (date, school_id, vegetarian, celiac, standard, caloric, ethnic) values ($1, $2, $3, $4, $5, $6, $7)',
    values: [fecha, school, vegetariano, celiaco, estandard, calorico, autoctono]
  })
  client.release()
}
async function get_pedidos(user_id){
  const client = await pool.connect()

  const { rows } =await client.query({
    text: "select to_char(orders.date,'DD-MM-YYYY') as date, orders.vegetarian, orders.celiac, orders.standard, orders.caloric, orders.ethnic, orders.is_rectified from orders where school_id=$1",
    values: [user_id]
  })
  console.table(rows)
  client.release()
  return rows
}

//funciones antiguas
async function get_preguntas(){
  const client = await pool.connect()

  const {rows} = await client.query({
    text: 'select * from questions order by random() limit 3'
  })
  client.release()
  return rows
}


async function check_respuesta(id,pregunta){
  const client = await pool.connect()
  const {rows} = await client.query({
    text: 'select answer=$1 as revision from questions where id=$2',
    values: [pregunta,id]
  })
  client.release()
  return rows[0].revision
}

async function add_score(id,score){
  const client = await pool.connect()
  await client.query({
    text: 'insert into puntajes (id_user,score) values ($1, $2)',
    values: [id, score]
  })
  client.release()
}

async function get_scores(){
  const client = await pool.connect()

  const { rows } = await client.query({
    text: 'select users.name, puntajes.score from puntajes join users on puntajes.id_user=users.id'
  })
  client.release()
  return rows
}

async function find_user(user){
  const client = await pool.connect()

  const { rows } = await client.query({
    text: "select users.name, puntajes.score from puntajes join users on puntajes.id_user=users.id where users.name like %$1%",
    values: [user]
  })
  client.release()
  return rows
}

module.exports = {
  get_user, create_user, add_menu, check_respuesta, add_score, get_scores, find_user, get_pedidos
}

