import store from '../vuex'
import AV from 'leancloud-storage'
var APP_ID = 'M1SivUjmGWHTFDv6FpwYxTpl-gzGzoHsz'
var APP_KEY = 'OwVDXgMCR09ztWdUIYGqG5Hl'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

export default {
    addUser() {
        var user = new AV.User()
        // 设置用户名
        user.setUsername('admin1')
        // 设置密码
        user.setPassword('123456')
        // 设置邮箱
        user.setEmail('admin1@mmxiaowu.com')
        return user.signUp()
    },
    getUser() {
        return AV.User.current()
    },
    login(config) {
        return AV.User.logIn(config.username, config.password)
    },
    postTopic(config) {
        var obj = AV.Object.extend('article')
        var topics = new obj()
        for (const value in config) {
            topics.set(value, config[value])
        }
        topics.set('is_delete', 0)
        topics.set('visit', 0)
        return topics.save()
    },
    getTopics(config) {
        var query = new AV.Query('article')
        if (config.admin === 0) {
            query.equalTo('is_delete', 0)
        }
        if (config.qs) {
            query.contains('title', config.qs)
        }
        if (config.id) {
            query.equalTo('category', config.id)
        }
        query.descending('createdAt')
        query.limit(config.limit)
        query.skip((config.page - 1) * config.limit)
        return Promise.all([
            query.count(),
            query.find()
        ]).then(data => {
            store.dispatch('gProgress', 100)
            return {
                list: data[1].map(i => {
                    return {
                        _id: i.get('id'),
                        title: i.get('title'),
                        category: i.get('category'),
                        content: i.get('content'),
                        visit: i.get('visit'),
                        is_delete: i.get('is_delete'),
                        creat_date: i.get('createdAt')
                    }
                }),
                total: data[0],
                hasNext: data[0] > config.page * config.limit,
                hasPrev: config.page > 1
            }
        }, error => {
            store.dispatch('showMsg', error.toString())
        })
    },
    getArticle(config) {
        var query = new AV.Query('article')
        var prev = new AV.Query('article')
        var next = new AV.Query('article')
        prev.equalTo('is_delete', 0)
        prev.ascending('createdAt')
        prev.limit(1)
        next.equalTo('is_delete', 0)
        next.descending('createdAt')
        next.limit(1)
        return query.get(config.id).then(result => {
            const data = {
                _id: result.get('id'),
                title: result.get('title'),
                category: result.get('category'),
                content: result.get('content'),
                creat_date: result.get('createdAt'),
                visit: result.get('visit')
            }
            prev.greaterThan('createdAt', data.creat_date)
            next.lessThan('createdAt', data.creat_date)
            return Promise.all([
                prev.first(),
                next.first()
            ]).then(result => {
                store.dispatch('gProgress', 100)
                const $return = {
                    data,
                    prev: {},
                    next: {}
                }
                if (result[0]) {
                    $return.prev = {
                        prev_id: result[0].get('id'),
                        prev_title: result[0].get('title')
                    }
                }
                if (result[1]) {
                    $return.next = {
                        next_id: result[1].get('id'),
                        next_title: result[1].get('title')
                    }
                }
                return $return
            }, error => {
                store.dispatch('showMsg', error.toString())
            })
        })
    },
    getAdminArticle(config) {
        var query = new AV.Query('article')
        return query.get(config.id).then(data => {
            store.dispatch('gProgress', 100)
            return {
                _id: data.get('id'),
                title: data.get('title'),
                category: data.get('category'),
                content: data.get('content')
            }
        }, error => {
            store.dispatch('showMsg', error.toString())
        })
    },
    modifyAdminArticle(id, config) {
        var query = AV.Object.createWithoutData('article', id)
        for (const value in config) {
            query.set(value, config[value])
        }
        return query.save().then(data => {
            return data
        }, error => {
            store.dispatch('showMsg', error.toString())
        })
    },
    deleteArticle(config) {
        var article = AV.Object.createWithoutData('article', config.id)
        article.set('is_delete', 1)
        return article.save().then(data => {
            return data
        }, error => {
            store.dispatch('showMsg', error.toString())
        })
    },
    recoverArticle(config) {
        var article = AV.Object.createWithoutData('article', config.id)
        article.set('is_delete', 0)
        return article.save().then(data => {
            return data
        }, error => {
            store.dispatch('showMsg', error.toString())
        })
    },
    postComment(config) {
        var obj = AV.Object.extend('comment')
        var comment = new obj()
        for (const value in config) {
            comment.set(value, config[value])
        }
        comment.set('is_delete', 0)
        return comment.save().then(data => {
            return {
                ...config,
                _id: data.id
            }
        }, error => {
            store.dispatch('showMsg', error.toString())
        })
    },
    getComment(config) {
        var query = new AV.Query('comment')
        query.equalTo('article_id', config.id)
        query.descending('createdAt')
        query.limit(config.limit)
        query.skip((config.page - 1) * config.limit)
        return Promise.all([
            query.count(),
            query.find()
        ]).then(data => {
            store.dispatch('gProgress', 100)
            return {
                list: data[1].map(i => {
                    return {
                        _id: i.get('id'),
                        username: i.get('username'),
                        content: i.get('content'),
                        is_delete: i.get('is_delete'),
                        creat_date: i.get('createdAt')
                    }
                }),
                total: data[0],
                hasNext: data[0] > config.page * config.limit,
                hasPrev: config.page > 1
            }
        }, error => {
            store.dispatch('showMsg', error.toString())
        })
    }
}
