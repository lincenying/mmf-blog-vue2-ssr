/**
 * 通用列表
 * @method list
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} sort    排序
 * @return {[type]}         [description]
 */
exports.list = async function (req, res, sort = '-_id') {
    sort = sort || '-_id'
    let { limit, page } = req.query
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    const skip = (page - 1) * limit
    try {
        const result = await Promise.all([this.find().sort(sort).skip(skip).limit(limit).exec(), this.countDocuments()])
        const total = result[1]
        const totalPage = Math.ceil(total / limit)
        const json = {
            code: 200,
            data: {
                list: result[0],
                total,
                hasNext: totalPage > page ? 1 : 0,
                hasPrev: page > 1 ? 1 : 0
            }
        }
        res.json(json)
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
    }
}

/**
 * 通用单个
 * @method item
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @return {[type]}         [description]
 */
exports.item = async function (req, res) {
    const _id = req.query.id
    if (!_id) {
        res.json({ code: -200, message: '参数错误' })
    }
    try {
        const result = await this.findOne({ _id })
        res.json({ code: 200, data: result })
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
    }
}

/**
 * 通用删除
 * @method flagDelete
 * @param  {[type]}   req     [description]
 * @param  {[type]}   res     [description]
 * @return {[type]}           [description]
 */
exports.deletes = async function (req, res) {
    const _id = req.query.id
    try {
        await this.updateOne({ _id }, { is_delete: 1 })
        res.json({ code: 200, message: '更新成功', data: 'success' })
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
    }
}

/**
 * 通用编辑
 * @method modify
 * @param  {[type]} res     [description]
 * @param  {[type]} _id     [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
exports.modify = async function (res, _id, data) {
    try {
        const result = await this.findOneAndUpdate({ _id }, data, { new: true })
        res.json({ code: 200, message: '更新成功', data: result })
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
    }
}

/**
 * 通用编辑
 * @method recover
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @return {[type]}         [description]
 */
exports.recover = async function (req, res) {
    const _id = req.query.id
    try {
        await this.updateOne({ _id }, { is_delete: 0 })
        res.json({ code: 200, message: '更新成功', data: 'success' })
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
    }
}
