import { Session } from 'meteor/session'

Template.mainLayout.onCreated(function() {
	Meteor.subscribe('category');
	Meteor.subscribe('report');

	setTimeout(function(){
		$('.tooltipped').tooltip({ delay: 50 });
		$(".dropdown-button").dropdown({
			belowOrigin: true,
		});
	}, 1000 );
});

Template.nav.onCreated(function() {
	$(".button-collapse").sideNav({
		closeOnClick: true
	});

});