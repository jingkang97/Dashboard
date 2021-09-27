// {
// 	id: 123
// 	sessionname: bboy
// 	Owner: string
// 	Users: [
// 	{User1 : 
// 			userid:
// 			username: 
// 			dancerNumber:  
//  			session: [{}]
//   	},
// 	{User2: 
// 			userid:
// 			username: 
// 			dancerNumber:  
//  			session: [{}]
// 	},
// 	{User3: 	
// 			userid:
// 			username: 
// 			dancerNumber:  
//  			session: [{}]
// 	}
// 	]
// 	Sync delay: []
// 	Fatigue: []
// 	startTime: Date
// 	endTime: Date
// 	Timestamp:  Date
// }

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = new Schema({


},{timestamps: true})

const Session = mongoose.model('Session', sessionSchema)
module.exports = Session