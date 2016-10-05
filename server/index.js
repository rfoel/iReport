Meteor.methods({
	'category.insert'(title, model) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Category.insert({
			title:title,
			model:model,
			deleted:false,
			createdBy:this.userId
		});
	},
	'category.softRemove'(category_id) {
		Category.update(category_id, {$set:{deleted:true}});
	},
	'category.restore'(category_id) {
		Category.update(category_id, {$set:{deleted:false}});
	},
	'category.remove'(category_id) {
		Category.remove(category_id);
	},
});