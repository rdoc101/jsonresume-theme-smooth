var fs = require("fs");
var path = require('path');
var Handlebars = require("handlebars");
var _ = require('lodash')
var moment = require('moment');

function render(resume) {

	_.each(resume.work, function(w){
		w.startDate = moment(w.startDate).format("MM.YYYY");
		if(w.endDate) {
			w.endDate = moment(w.endDate).format("MM.YYYY");
		} else {
			w.endDate = 'Present'
		}
	});
	_.each(resume.volunteer, function(w){
		w.startDate = moment(w.startDate).format("MM.YYYY");
		if(w.endDate) {
			w.endDate = moment(w.endDate).format("MM.YYYY");
		} else {
			w.endDate = 'Present'
		}
	});
	_.each(resume.education, function(w){
		w.startDate = moment(w.startDate).format("MM.YYYY");
		if(w.endDate) {
			w.endDate = moment(w.endDate).format("MM.YYYY");
		} else {
			w.endDate = 'Present'
		}
	});


	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	var partialsDir = path.join(__dirname, 'partials');
	var filenames = fs.readdirSync(partialsDir);

	filenames.forEach(function (filename) {
	  var matches = /^([^.]+).hbs$/.exec(filename);
	  if (!matches) {
	    return;
	  }
	  var name = matches[1];
	  var filepath = path.join(partialsDir, filename)
	  var template = fs.readFileSync(filepath, 'utf8');

	  Handlebars.registerPartial(name, template);
	});

	Handlebars.registerHelper({
		or: function (v1, v2) {
        return v1 || v2;
    }
	});
	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};
