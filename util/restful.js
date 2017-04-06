/**
 * Created by storm on 15/9/21.
 */
var path = require('path');
var fs = require('fs');
var cfg = require('../../config.js');
var modelPath = path.join(cfg.rootpath, '/models', '/');
var Model = function (model) {
    var _m = model;
    this.list = function (condition, next) {
        _m.find(condition, next)
    };
    this.insert = function (entity, next) {
        _m.create(entity, next)
    };
    this.entity = function (id, next) {
        _m.findById(id, next)
    };
    this.delete = function (id, next) {
        _m.findById(id, function (err, result) {
            err = (!result || result.length == 0 ) ? 404 : err;
            if (!err && result) {
                _m.findByIdAndRemove(id, function (err) {
                    next(err);
                })
            } else {
                next(err);
            }
        })
    };
    this.update = function (id, entity, next) {
        _m.findById(id, function (err, result) {
            err = (!result || result.length == 0 ) ? 404 : err;
            if (!err && result) {
                result.update(entity, function (err) {
                    next(err);
                })
            } else {
                next(err);
            }
        })
    };
};
var sendInfo = function (err, result) {
    var r = {};
    if (!err) {
        r = {
            status: 200,
            result: result
        };
        if (!result) {
            delete r.result;
        }
    } else {
        if (err == 404) {
            r.status = 404;
            r.message = "the data does not exist";
            r.result = null;
        }
    }
    return r;
};
var filter = function (req, res, next) {
    delete req.body.appID;
    delete req.query.appID;
    delete req.params.appID;
    next();
}
var loadModelRoute = function (modelName, model, route) {
    var modelNamePlural = '/' + modelName + 's';
    var locate = modelNamePlural + '/:id';
    route.route(modelNamePlural)
        .get(function (req, res) {
            var conditions = req.query || {};
            model.list(conditions, function (err, result) {
                result = sendInfo(err, result);
                res.send(result);
            })
        })
        .post(function (req, res) {
            var entity = req.body || {};
            model.insert(entity, function (err) {
                var result = sendInfo(err);
                res.send(result);
            })
        });
    route.route(locate)
        .get(function (req, res) {
            var entity = req.params || {};
            model.entity(entity.id, function (err, result) {
                var result = sendInfo(err, result);
                res.send(result);
            })
        })
        .delete(function (req, res) {
            var entity = req.params || {};
            var id = entity.id;
            model.delete(id, function (err) {
                var result = sendInfo(err);
                res.send(result);
            })
        })
        .put(function (req, res) {
            var entity = req.body || {};
            var id = req.params.id;
            model.update(id, entity, function (err) {
                var result = sendInfo(err);
                res.send(result);
            })
        })
};
var restful = function (route) {
    var models = fs.readdirSync(modelPath);
    route.use(filter);
    for (var i = 0; i < models.length; i++) {
        var ref = require(path.join(modelPath, models[i]));
        var model = new Model(ref);
        var key = models[i].replace('Model.js', '');
        loadModelRoute(key, model, route);
    }
    return route;
}

module.exports = restful;