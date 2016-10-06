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
	'category.update'(category_id, title, model) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Category.update({_id: category_id},
			{$set: {
				title:title,
				model:model
			},
		});
	},
	'category.softRemove'(category_id) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Category.update(category_id, {$set:{deleted:true}});
	},
	'category.restore'(category_id) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Category.update(category_id, {$set:{deleted:false}});
	},
	'category.remove'(category_id) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Category.remove(category_id);
	},
	'user.update' (user_id, name, surname, email) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Meteor.users.update({_id: user_id}, 
			{$set: { 
				profile: { name: name, surname: surname },
				emails: [{ address: email }]
			},
		});
	}
});