/* photorant.js - consolidate some of these page scripts */

/* globals $, escape, unescape */

//

if (botz === undefined) {
	var botz = {};
}

function OpenTrackback(c) {
	'use strict';
	window.open(c,
	      'trackback',
	      'width=480,height=480,scrollbars=yes,status=yes');
}

function OpenComments (c) {
	'use strict';
	window.open(c,
			'comments',
			'width=480,height=480,scrollbars=yes,status=yes');
}

// Copyright (c) 1996-1997 Athenia Associates.
// http://www.webreference.com/js/
// License is granted if and only if this entire
// copyright notice is included. By Tomer Shiran.

function setCookie (name, value, expires, path, domain, secure) {
	'use strict';
	var curCookie = name + '=' + escape(value) + ((expires) ? '; expires=' + expires.toGMTString() : '') + ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '') + ((secure) ? '; secure' : '');
	document.cookie = curCookie;
}

function getCookie (name) {
	'use strict';
	var prefix = name + '=';
	var c = document.cookie;
	var nullstring = '';
	var cookieStartIndex = c.indexOf(prefix);
	if (cookieStartIndex === -1) {
		return nullstring;
	}
	var cookieEndIndex = c.indexOf(';', cookieStartIndex + prefix.length);
	if (cookieEndIndex === -1) {
		cookieEndIndex = c.length;
	}
	return unescape(c.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

function deleteCookie (name, path, domain) {
	'use strict';
	if (getCookie(name)) {
		document.cookie = name + '=' + ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '') + '; expires=Thu, 01-Jan-70 00:00:01 GMT';
	}
}

function fixDate (date) {
	'use strict';
	var base = new Date(0);
	var skew = base.getTime();
	if (skew > 0) {
		date.setTime(date.getTime() - skew);
	}
}

function rememberMe (f) {
	'use strict';
	var now = new Date();
	fixDate(now);
	now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
	setCookie('mtcmtauth', f.author.value, now, '', botz.HOST, '');
	setCookie('mtcmtmail', f.email.value, now, '', botz.HOST, '');
	setCookie('mtcmthome', f.url.value, now, '', botz.HOST, '');
}

function forgetMe (f) {
	'use strict';
	deleteCookie('mtcmtmail', '', botz.HOST);
	deleteCookie('mtcmthome', '', botz.HOST);
	deleteCookie('mtcmtauth', '', botz.HOST);
	f.email.value = '';
	f.author.value = '';
	f.url.value = '';
}

function fbBut(URL) {
	'use strict';
	var ut = URL;
	ut = ut.replace(/:/,'%3A'); // just one
	ut = ut.replace(/\//g,'%2F');
	return '//www.facebook.com/plugins/like.php?href='+ut+'&amp;send=false&amp;layout=standard&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=35';
}

var gRActions = []; // new Array();

$(document).ready(function() {
	'use strict';
	$('img').removeAttr('height'); // reactive design hack
	for (var a=0; a<gRActions.length; a++) {
	   gRActions[a]();
	}
});


/*  $(document).ready(function() { // from catArchive monthArch maindex
    for (var a=0; a<gRActions.length; a++) {
       gRActions[a]();
    }
  });*/

// used by main page
$(document).ready(function mcmts() {
	'use strict';
	if (botz.commentCount === undefined) { // this isn't a multi-list page
		return;
	}
	var cmt;
	for (cmt in botz.commentCount) {
		if (botz.commentCount[cmt] < 1) {
			$('#'+cmt).addClass('hidden');
		}
	}
});

// used by individual entry
$(document).ready(function ecmts() {
	'use strict';
	if (botz.commentsOpen === undefined) { // this isn't an individual entry
		return;
	}
	var cmts = $('.indivComment');
	var postable = ($('#comments-posting').length > 0);
	if ((cmts === undefined || (cmts.length < 1)) && (!postable)) {
	   $('.commentary').addClass('hidden');
	   console.log('Hiding comments fields');
	}
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip();
	});
});

/// eof 
