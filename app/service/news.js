"use strict";


module.exports = app => {
    class NewsService extends app.Service { *
        list(page = 1) {
            // read config
            const { serverUrl, pageSize } = this.app.config.news;
            // use build-in http client to GET hacker-news api
            const { data: idList } = yield this.ctx.curl(`${serverUrl}/topstories.json`, {
                data: {
                    orderBy: '"$key"',
                    startAt: `"${pageSize * (page - 1)}"`,
                    endAt: `"${pageSize * page - 1}"`,
                },
                dataType: 'json',
            });
            // parallel GET detail, see `yield {}` from co
            const newsList = yield Object.keys(idList).map(key => {
                const url = `${serverUrl}/item/${idList[key]}.json`;
                console.log(url);
                return this.ctx.curl(url, { dataType: 'json' });
            });
            return newsList.map(res => res.data);
        }
    }
    return NewsService;
};