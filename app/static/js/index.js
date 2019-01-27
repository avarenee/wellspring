String.prototype.has = function() {
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] != '' && this.indexOf(arguments[i]) != -1) return true;
	}
	return false;
};

String.prototype.is = function() {
	for (var i = 0; i < arguments.length; i++) {
		if (this == arguments[i]) return true;
	}
	return false;
};

String.prototype.toTitleCase = function() {
	return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

/**Things to collect**/
var q1response, q2response, q3response, finalresponse, stepnumber = 1;
var finalresponse_cleared = false;
/**
	Text to type.
	Reserved characters:
	"^", "<", ">", "|"
**/
var si = 0;
var sts = [
	/*[0]*/
	'Let\'s cultivate your garden of thoughts.^',
	/*[1]*/
	'What\'s on your mind?>',
	/*[2]*/
	'',
	/*[3]*/
	'',
	/*[4]*/
	'',
	/*[5]*/
	'Let\'s give you some space to let loose._^',
	/*[6]*/
	'Please use the space below to express yourself>. The more specific you are, the better we will understand your needs. Type away.',
	/*[7]*/
	'',
	/*[8]*/
	'...and remember, just keep breathing. 😊_^',
	/*[9]*/
	''
];

/* Where to type them */
var ii = 0;
var ids = ['pin_0', 'pin_1', 'pin_2', 'pin_3', 'pin_4', 'pin_5', 'pin_6', 'pin_7', 'pin_8', 'pin_9'];

/* Functions to call from "script" */
_set_cursor = function(s) {
	document.body.className = s;
	console.log(document.body.className)
};

_show_q1response = function() {
	q1_response.className = 'wake pulse';
	q1_response.focus();
};

_show_q2response = function() {
	var ename = q1response.replace(/\s/g, '');
	q2_response.value = '';
	q2_response.className = 'wake pulse';
	q2_response.focus();
};

_show_q3response = function() {
	q3_response.className = 'wake pulse';
	q3_response.focus();
};

_show_finalresponse = function() {
	type.className = 'wake pulse';
	type.addEventListener('focus', _show_submit, false);
};

_show_submit = function() {
	if (!finalresponse_cleared) {
		finalresponse_cleared = true;
		type.innerHTML = '';
		type.focus();
	}
	type.className = 'wake';
	go.className = 'wake';
};

var fi = 3;
var funcs = [
	/*[0] - toggle cursor state*/
	_set_cursor,
	/*[1]*/
	function() {
		console.log('f1')
	},
	/*[2]*/
	function() {
		console.log('f2')
	},
	/* Functions to run consecutively: fi 3+ */
	/*[3]*/
	_show_q1response,
	/*[4]*/
	_show_q2response,
	/*[5]*/
	_show_q3response,
	/*[6]*/
	_show_finalresponse,
	/*[7]*/
	_show_submit,
	/*[8]*/
	function() {
		console.log('f8')
	},
	/*[9]*/
	function() {
		console.log('f9')
	}
];

/* A little engine that typed */
var textHolder, textTarget, letter, li, typeSpeed = 25,
	shortPause = 250,
	longPause = 500,
	tenseSilence = 2000,
	waiting = false;

_type = function() {
	if (waiting == false) {
		li = 0;
		waiting = true;
		textTarget = document.getElementById('pin_' + ii);
		textTarget.removeEventListener('click', _type, false);
		textTarget.innerHTML = '';
		textTarget.className = '';
		textHolder = sts[si].split('');
		_get();
		funcs[0]('wait');
	}
};

_get = function() {
	if (li < textHolder.length) {
		setTimeout(
			function() {
				letter = document.createTextNode(textHolder[li]);
				_print(textTarget, letter);
			}, typeSpeed);

	} else {
		waiting = false;
		funcs[0]('');
	}
};

_print = function(textTarget, letter) {
	li++;
	if (letter.nodeValue == ',' || letter.nodeValue == ';' || letter.nodeValue == ':') {
		setTimeout(_get, shortPause);
	} else if (letter.nodeValue == '.' || letter.nodeValue == '!' || letter.nodeValue == '?') {
		setTimeout(_get, longPause);
	} else if (letter.nodeValue == '_') {
		letter.nodeValue = ' ';
		setTimeout(_get, tenseSilence);
	} else if (letter.nodeValue == '^') {
		/* interrupt typing, advance to the next string and the next spot and continue*/
		letter.nodeValue = '';
		waiting = false;
		funcs[0]('');
		document.getElementById('pin_' + ii).className = 'rest';
		si++;
		ii++;
		if ((sts[si] != 'undefined') && (ids[ii] != 'undefined')) _type();
	} else if (letter.nodeValue == '>') {
		/* run next function */
		fi = Math.min(fi, (funcs.length - 1));
		funcs[fi]();
		console.log('function' + fi + 'called');
		letter.nodeValue = '';
		fi++;
		_get();
	} else if (letter.nodeValue == '<') {
		/* run previous function - do I need this? */
		fi = Math.max(fi, 3);
		funcs[fi]();
		console.log('function' + fi + 'called');
		letter.nodeValue = '';
		fi--;
		_get();
	} else {
		_get();
	}
	textTarget.appendChild(letter);
};

_q1_response_react = function() {
	if (q1_response.value != '' && si == 1) {
		document.getElementById('pin_' + ii).className = 'rest';
		q1response = q1_response.value.toTitleCase();
		sts[2] = 'Thank you, we know it can be difficult to lay out your thoughts. \n How would you describe your mood right now? >'
		si = 2;
		ii = 2;
		q1_response.removeEventListener('blur', _q1_response_react, false);
		q1_response.className = 'sleep';
		q1_response.parentNode.className = 'collapsed';
		_update_step();
		_type();
	}
};

_q2_response_react = function() {
	if (q2_response.value != '' && si == 2) {
		document.getElementById('pin_' + ii).className = 'rest';
		q2response = q2_response.value;
		sts[3] = 'Thank you - whether you\'re having a great day or feeling down, it\'s important to be in touch with yourself. \n If you had to pick a color to describe your mood, what would it be?>'
		si = 3;
		ii = 3;
		q2_response.removeEventListener('blur', _q1_response_react, false);
		q2_response.className = 'sleep';
		q2_response.parentNode.className = 'collapsed';
		_update_step();
		_type();
	}
};

_q3_response_react = function() {
	if (q3_response.value != '' && si == 3) {
		document.getElementById('pin_' + ii).className = 'rest';
		q3response = q3_response.value.replace(/\s/g, '');
		q3response = q3response.toTitleCase();
		sts[4] = 'Alright, we\'re with you._^'
		si = 4;
		ii = 4;
		document.getElementById('pin_' + ii).style.color = q3response;
		q3_response.removeEventListener('blur', _q1_response_react, false);
		q3_response.className = 'sleep';
		q3_response.parentNode.className = 'collapsed';
		_type();
	}
};

_check_form = function(e) {
	var key = e.charCode || e.keyCode || 0;
	if (key == 13) {
		if (si < 9) e.preventDefault();
		_q1_response_react();
		_q2_response_react();
		_q3_response_react();
	}
};

_send_final = function() {
	type.contentEditable = false;
	document.getElementById('pin_' + ii).className = 'rest';
	go.className = 'rest';
	setTimeout(function() {
			type.className = 'rest';
			step.className = 'sleep';
		}, 10000);
		sts[7] = 'Snazzy - we hope you are excited to plant your thought, no matter how wonderful or anxious it was.^';
		si = 7;
		ii = 7;
		_update_step();
		_type();
	};


_stretch_field = function() {
	this.style.width = Math.max(3, this.value.length * .75) + 'em';
};

_update_step = function() {
	step.className = 'sleep';
	setTimeout(function() {
		step.innerText = stepnumber;
		stepnumber++;
		setTimeout(function() {
			step.className = 'wake';
		}, 2000);
	}, 2000);
};

pin_0.addEventListener('click', _type, false);
pin_0.addEventListener('click', _update_step, false);
plant_thought.addEventListener('keypress', _check_form, false);
q1_response.addEventListener('keyup', _stretch_field, false);
q1_response.addEventListener('blur', _q1_response_react, false);
q2_response.addEventListener('focus', _stretch_field, false);
q2_response.addEventListener('keyup', _stretch_field, false);
q2_response.addEventListener('blur', _q2_response_react, false);
q3_response.addEventListener('keyup', _stretch_field, false);
q3_response.addEventListener('blur', _q3_response_react, false);
go.addEventListener('click', _send_final, false);

function addResponse() {
  const newResponse = q1response.concat(q2response, q3response);  
  db.collection("Profiles")
	.insertOne({responses: newResponse})
	.then(console.log(newResponse));
}

/* end */