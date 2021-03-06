/* jslint node: true */
var website = {};

website.components = {};

(function (publics) {
	"use strict";

	website.components.listOfArticles = require('../modules/list-of-articles');
	website.components.markdownRender = require('../modules/markdown-render');
	website.components.extendedFormatDate = require('../modules/extended-format-date');

	publics.changeVariations = function (next, locals, request) {
		var NA = this,
			mongoose = NA.modules.mongoose,
			marked = NA.modules.marked,
			Article = mongoose.model('article'),
			session = request.session;

		locals.backend = {};
		locals.session = session;

		website.components.listOfArticles({
			Article: Article,
			marked: marked,
			markdownRender: website.components.markdownRender,
			session: locals.session,
			extendedFormatDate: website.components.extendedFormatDate,
			locals: locals
		}, function (listOfArticles) {

			locals.specific = listOfArticles;

			next();
		});
	};

}(website));

exports.changeVariations = website.changeVariations;