"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedCaseStudies = void 0;
var caseStudies_1 = require("./caseStudies.cjs");
var getFeaturedCaseStudies = function () {
    var featuredIds = [
        // International Partnerships & High-Profile Projects
        'gilead-ias-2025',
        'plus-life-media-ias-2025',
        // Major National Events & Government Projects
        'miss-rwanda-inspiration-backup',
        'kwibuka30-rwanda-despair-to-hope',
        'rssb-mou-signing',
        // Educational & Research Institutions
        'alu-africa-business-heroes-2023',
        'aims-research-innovation-centre',
        'biomex-uvu-bio',
        'undp-youth-cafe',
        // Corporate & Industrial Projects
        'rwanda-rising-cimerwa-documentary',
        'aspire-programme-year-three',
        'snv-clean-cooking',
        // Digital & Social Media Content
        'gilead-short-form-content'
    ];
    return featuredIds.map(function (id) { return caseStudies_1.caseStudies[id]; }).filter(Boolean);
};
exports.getFeaturedCaseStudies = getFeaturedCaseStudies;
