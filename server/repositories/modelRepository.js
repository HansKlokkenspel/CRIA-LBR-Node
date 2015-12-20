var ObjectId = require('mongodb').ObjectID;

var ModelRepository = function (modelName) {
    var Model = require('../models/' + modelName + '');

    var findModels = function (cb) {
        Model.find(function (err, result) {
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
                populateModel(result, function (popResult) {
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

                    for (var key in result) {
                        if (newModel.hasOwnProperty(key)) {
                            result[key] = result[key];
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
                cb({result: popResult});
            } else {
                cb({error: err});
            }
        });
    };

    return {
        findModels: findModels,
        findModelById: findModelById,
        editModelById: editModelById,
        deleteModelById: deleteModelById,
        addModel: addModel
    };
};

var populateModel = function (result, Model, cb) {
    var objectIdRegex = /^[a-f\d]{24}$/i;

        for (var i = 0; i < result.length; i++) {
            var obj = result[i];

            for(var key in obj){
                console.log(obj[key]);
                console.log(key.name);
                //if (result[key].match(objectIdRegex)) {
                //    Model.deepPopulate(result, function (err, popResult) {
                //        if (!err) {
                //            cb({result: popResult});
                //        } else {
                //            cb({error: err});
                //        }
                //    });
                //} else{
                //    cb({result: result});
                //}
            }
        }

    cb(result);
};

module.exports = ModelRepository;