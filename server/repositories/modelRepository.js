var ObjectId = require('mongodb').ObjectID;
var Destination = require('../models/destinationModel');
var User = require('../models/userModel');

var ModelRepository = function (modelName) {
    var Model = require('../models/' + modelName + '');

    var findModels = function (queryString, cb) {
        Model.find(createQuery(queryString), function (err, result) {
            populateModel(result, Model, function (popResult) {
                cb(popResult);
            });
        });
    };

    var findModelById = function (id, cb) {
        id = new ObjectId(id);

        Model.findOne({
            _id: id
        }, function (err, result) {
            if (err) {
                cb({error: err});
            } else {
                populateModel(result, Model, function (popResult) {
                    cb(popResult);
                });
            }
        });
    };

    var editModelById = function (id, newModel, cb) {
        id = new ObjectId(id);

        Model.findOne({
                _id: id
            }, function (err, result) {
                if (result) {
                    for (var key in newModel) {
                        result[key] = newModel[key];
                    }

                    result.save(function (err, saveResult) {
                        if (saveResult) {
                            cb({result: saveResult});
                        } else {
                            cb({error: err});
                        }
                    });
                } else {
                    cb({error: err});
                }
            }
        );
    };

    var deleteModelById = function (id, cb) {
        id = new ObjectId(id);

        Model.remove({
            _id: id
        }, function (err) {
            cb({error: err});
        });
    };

    var addModel = function (model, cb) {
        var newModel = new Model();

        for (var key in newModel) {
            if (model.hasOwnProperty(key)) {
                newModel[key] = model[key];
            }
        }

        newModel.save(function (err, result) {
            if (result) {
                cb({result: result});
            } else {
                cb({error: err});
            }
        });
    };

    var populateModel = function (result, Model, cb) {
        var hydratedResult = Model.hydrate(result);

        if (typeof hydratedResult.getPopulationPath === 'function') {
            Model.deepPopulate(result, hydratedResult.getPopulationPath(), function (err, popResult) {
                if (!err) {
                    result = popResult;
                    cb({result: result});
                } else {
                    cb({error: err});
                }
            });
        } else {
            cb(result);
        }
    };

    var paginateModel = function (queryString, currentPage, limit, cb) {
        var query = createQuery(queryString);
        Model.paginate(query, {page: currentPage /*req.query.page*/, limit: limit}, function (err, paginationResult) {
            populateModel(paginationResult.docs, Model, function (pagePopResult) {
                cb(paginationResult);
            });
        });
    };

    var createQuery = function (queryString) {
        var query = {};

        for (var key in queryString) {
            if (key in Model) {
                query[key] = queryString[key];
            }
        }

        return query;
    };

    return {
        findModels: findModels,
        findModelById: findModelById,
        editModelById: editModelById,
        deleteModelById: deleteModelById,
        addModel: addModel,
        populateModel: populateModel,
        paginateModel: paginateModel,
        createQuery: createQuery
    };
};

module.exports = ModelRepository;