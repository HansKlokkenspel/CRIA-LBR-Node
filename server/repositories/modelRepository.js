var ObjectId = require('mongodb').ObjectID;
var Destination = require('../models/destinationModel');
var User = require('../models/userModel');

var ModelRepository = function (modelName) {
    var Model = require('../models/' + modelName + '');

    var findModels = function (query, cb) {
        Model.find(query, function (err, result) {
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

    return {
        findModels: findModels,
        findModelById: findModelById,
        editModelById: editModelById,
        deleteModelById: deleteModelById,
        addModel: addModel,
        populateModel: populateModel
    };
};
module.exports = ModelRepository;