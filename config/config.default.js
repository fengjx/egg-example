"use strict";

module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = appInfo.name + "_1503586771307_1263";

    // add your config here

    config.view = {
        defaultViewEngine: "nunjucks",
        mapping: {
            ".html": "nunjucks"
        }
    };

    config.news = {
        pageSize: 5,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    };

    config.middleware = [
        'robot'
    ];

    config.robot = {
        ua: [
            /Baiduspider/i,
        ]
    };

    return config;
};