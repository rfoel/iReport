Meteor.publish('category', function() {
	return Category.find();
});

Meteor.publish('report', function() {
	return Report.find({});
});

Meteor.methods({
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
	},
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
	'report.insert'(name, description, category, datetime, createdOn) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		var report = Report.insert({
			name:name,
			description:description,
			category:category,
			datetime:datetime,
			deleted:false,
			createdOn:createdOn,
			createdBy:this.userId
		});

		return report;
	},
	'report.update'(report_id, name, description, category, updatedAt) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Report.update({_id: report_id},
			{$set: {
				name:name,
				description:description,
				category:category,
				updatedAt:updatedAt
			},
		});
	},
	'report.softRemove'(report_id) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Report.update(report_id, {$set:{deleted:true}});
	},
	'report.restore'(report_id) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Report.update(report_id, {$set:{deleted:false}});
	},
	'report.remove'(report_id) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		Report.remove(report_id);
	},
});