import { Session } from 'meteor/session'

Template.mainLayout.onCreated(function() {
	Meteor.subscribe('category.user');
	Meteor.subscribe('report.user');

	setTimeout(function(){
		$('.tooltipped').tooltip({ delay: 50 });
		$(".dropdown-button").dropdown({
			belowOrigin: true,
		});
	}, 1500 );
});

Template.nav.onCreated(function() {
	setTimeout(function(){
		$(".button-collapse").sideNav({
			closeOnClick: true
		});
	}, 1500 );
});