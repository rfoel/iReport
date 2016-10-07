import { Session } from 'meteor/session'

Template.mainLayout.onCreated(function() {
	Meteor.subscribe('category');
	Meteor.subscribe('report');

	setTimeout(function(){
		$('.tooltipped').tooltip({ delay: 50 });
	}, 500 );
});

Template.nav.onCreated(function() {
	$(".button-collapse").sideNav({
		closeOnClick: true
	});
	$(".dropdown-button").dropdown({
		belowOrigin: true,
	});
});

Template.dropdown_profile.onCreated(function() {
	$(".dropdown-button").dropdown({
		belowOrigin: true,
	});
});
