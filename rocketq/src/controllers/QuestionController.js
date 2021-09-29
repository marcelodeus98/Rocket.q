const Database = require('../db/config')
module.exports = {

    async index(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password
        
        //Verificar se a senha está correta e segui com a ação de deletar ou marcar como lido
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if(verifyRoom.pass == password){
            if(action == "delete"){
                await db.run(` DELETE FROM questions WHERE id = ${questionId}` )
            }
            else if(action == "check"){
                await db.run(`UPDATE questions SET read_mark = 1 WHERE id = ${questionId}`)
            }
            res.redirect(`/room/${roomId}`)
        
        }else{
            res.render('passincorrect', {roomId: roomId})
        }

    },

    async create(req, res){
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions(
            title,
            read_mark,
            room
        )VALUES (
           "${question}",
            0,
            ${roomId}
        )`)

        res.redirect(`/room/${roomId}`)
    }

}