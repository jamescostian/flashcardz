module.exports = {
	nameByID: function (id) {
		return flashcardz.r.table('cards').get(id).pluck('name').run().then(function (data) {
			return data['name']
		})
	},
	idByName: function (stack, name) {
		return flashcardz.r.table('cards').filter({stack: stack, name: name}).pluck('id').run().then(function (data) {
			return data.toArray()
		}).then(function (data) {
			return data[0]['id']
		})
	}
}
