const _ = require("lodash");
const Service = require('egg').Service;

class Socket extends Service {

	getUserRoom(id) {return `__user_${id}__`;}
	getGroupRoom(id) { return `__group_${id}__`;}
	getMsg({payload = {}, action, metadata = {}}) {
		return {
			meta: {
				timestmap: Date.now(),
				...metadata,
			},
			action,
			payload,
		}
	}

	async online({socket, userId}) {
		const rooms = [];
		if (!userId) return;

		//const groups = await this.app.model.group.findAll({
			//include: [
			//{
				//as: "groupMember",
				//model: this.app.model.groupMember,
				//where: {memberId: userId}
			//}
			//]
		//}).then(list => list.map(o => o.toJSON()));

		//const rooms = groups.map(o => this.getGroupRoom(o.id));
		rooms.push(this.getUserRoom(userId));

		return new Promise((resolve, reject) => {
			socket.join(rooms, () => {
				return resolve(true);
			});
		})
	}

	offline({socket, userId}) {

	}

}

module.exports = Socket;
