const moment = require('moment')
const markdownIt = require('markdown-it')
const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor').default
const hljs = require('highlight.js')

const mongoose = require('../mongoose')
const Article = mongoose.model('Article')
const Category = mongoose.model('Category')
const general = require('./general')

const list = general.list
const item = general.item

const marked = md => {
    const $return = {
        html: '',
        toc: ''
    }
    const html = markdownIt({
        breaks: true,
        html: true,
        linkify: true,
        typographer: true,
        highlight(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value
                } catch (error) {}
            }
            return ''
        }
    })
        .use(markdownItTocAndAnchor, {
            tocCallback(tocMarkdown, tocArray, tocHtml) {
                $return.toc = tocHtml
            }
        })
        .render(md)
    $return.html = html
    return $return
}

/**
 * 管理时, 获取文章列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getList = (req, res) => {
    list(req, res, Article, '-update_date')
}

/**
 * 管理时, 获取单篇文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getItem = (req, res) => {
    item(req, res, Article)
}

/**
 * 发布文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.insert = (req, res) => {
    const { category, content, title } = req.body
    const md = marked(content)
    const html = md.html
    const toc = md.toc
    const arr_category = category.split('|')
    const data = {
        title,
        category: arr_category[0],
        category_name: arr_category[1],
        content,
        html,
        toc,
        visit: 0,
        like: 0,
        comment_count: 0,
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        timestamp: moment().format('X')
    }
    Article.createAsync(data)
        .then(result => {
            return Category.updateOneAsync({ _id: arr_category[0] }, { $inc: { cate_num: 1 } }).then(() => {
                return res.json({ code: 200, message: '发布成功', data: result })
            })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

/**
 * 管理时, 删除文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.deletes = (req, res) => {
    const _id = req.query.id
    Article.updateOneAsync({ _id }, { is_delete: 1 })
        .then(() => {
            return Category.updateOneAsync({ _id }, { $inc: { cate_num: -1 } }).then(result => {
                res.json({ code: 200, message: '更新成功', data: result })
            })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

/**
 * 管理时, 恢复文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.recover = (req, res) => {
    const _id = req.query.id
    Article.updateOneAsync({ _id }, { is_delete: 0 })
        .then(() => {
            return Category.updateOneAsync({ _id }, { $inc: { cate_num: 1 } }).then(() => {
                res.json({ code: 200, message: '更新成功', data: 'success' })
            })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

/**
 * 管理时, 编辑文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.modify = (req, res) => {
    const { id, category, category_old, content } = req.body
    const md = marked(content)
    const html = md.html
    const toc = md.toc
    const data = {
        title: req.body.title,
        category: req.body.category,
        category_name: req.body.category_name,
        content,
        html,
        toc,
        update_date: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    Article.findOneAndUpdateAsync({ _id: id }, data, { new: true })
        .then(result => {
            if (category !== category_old) {
                Promise.all([
                    Category.updateOneAsync({ _id: category }, { $inc: { cate_num: 1 } }),
                    Category.updateOneAsync({ _id: category_old }, { $inc: { cate_num: -1 } })
                ]).then(() => {
                    res.json({ code: 200, message: '更新成功', data: result })
                })
            } else {
                res.json({ code: 200, message: '更新成功', data: result })
            }
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}
