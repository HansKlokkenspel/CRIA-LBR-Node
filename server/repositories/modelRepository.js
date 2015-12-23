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
            }

            if(result) {
                populateModel(result, Model, function (popResult) {
                    cb(popResult);
                });
            } else {
                cb({error: 'no document found!'});
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
                        if (newModel[key]) {
                            result[key] = newModel[key];
                        }
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
        console.log(id);
        Model.remove({
            _id: id
        }, function (err) {
            if(err){
                cb({error: err});
            } else {
                cb({result: 'success!'});
            }
        });
    };

    var addModel = function (model, cb) {
        var newModel = new Model();
        var relationShips = {};

        for (var key in newModel) {
            if (model.hasOwnProperty(key)) {
                newModel[key] = model[key];
                if(newModel.hasParentPath(key)){
                    relationShips[key] = model[key];
                }
            }
        }

        newModel.save(function (err, result) {
            if (result) {
                var objectKeys = Object.keys(relationShips).length;

                for(var relationShip in relationShips){
                    var repo = require('./modelRepository')(relationShip + 'Model');

                    repo.findModelById(relationShips[relationShip], function(relationResult){
                        if(modelName === 'hotelModel'){
                            relationResult.result.hotels.push(result._id);
                            relationResult.result.save(function(err, destinationResult){
                                cb({result: result});
                            });
                        }
                    });
                }
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
        Model.paginate(query, {page: currentPage , limit: limit}, function (err, paginationResult) {
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