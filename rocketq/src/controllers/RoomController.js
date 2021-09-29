const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId
        let isRoom = true

        while(isRoom){
            // Gera o número da sala
            for( let j= 0; j < 6; j++){
                j == 0 ? roomId = Math.floor(Math.random()*10).toString() :
                roomId += Math.floor(Math.random()*10).toString()
            }
            
            //Verificar se o número já existi
            const roomExistId = await db.all(`SELECT id FROM rooms`)
    
            isRoom = roomExistId.some(roomExistId  => roomExistId === roomId)
            
            //Se o número não existe
            if(! isRoom){
                //Inseri a sala no banco
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
    
            }
        }
        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read_mark = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read_mark = 1`)
 
        res.render("room", {roomId : roomId, questions : questions, questionsRead: questionsRead})

    },

    enter(req, res){
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }

}