const Client = require('./client');
const Responsibility = require('./responsibility');
const Picture = require('./picture');
const Question = require('./question');
const Kind = require('./kind');
const Exercise = require('./exercise');
const Doc = require('./doc');
const Theme = require('./theme');
const Possible_answer = require('./possibleAnswer');
const Client_exercise = require('./clientExercise');

// Association 1:N 
Picture.hasMany(Doc, {
    as: 'docs',
    foreignKey: 'picture_id'
});
Doc.belongsTo(Picture, {
    as: 'picture',
    foreignKey: 'picture_id'
});

Responsibility.hasMany(Client, {
    as: 'clients',
    foreignKey: 'responsibility_id'
});
Client.belongsTo(Responsibility, {
    as: 'responsibility',
    foreignKey: 'responsibility_id'
});

Kind.hasMany(Exercise, {
    as: 'exercises',
    foreignKey: 'kind_id'
});
Exercise.belongsTo(Kind, {
    as: 'kind',
    foreignKey: 'kind_id'
});

Question.hasMany(Possible_answer, {
    as: 'possible_answers',
    foreignKey: 'question_id'
});
Possible_answer.belongsTo(Question, {
    as: 'question',
    foreignKey: 'question_id'
});

// Association 1:1
Question.belongsTo(Picture, {
    as: 'question_picture',
    foreignKey: 'picture_id'
});

Client.belongsTo(Picture, {
    as: 'client_picture',
    foreignKey: 'picture_id'
});

// Association N:N
Client.belongsToMany(Doc, {
    as: 'docs',
    through: 'client_doc',
    foreignKey: 'client_id',
    otherKey: 'doc_id',
    timestamps: false
});
Doc.belongsToMany(Client, {
    as: 'clients',
    through: 'client_doc',
    // don't forget to reverse the informations
    foreignKey: 'doc_id',
    otherKey: 'client_id',
    timestamps: false
});

Client.belongsToMany(Exercise, {
    as: 'exercises',
    through: Client_exercise,
    foreignKey: 'client_id',
    otherKey: 'exercise_id',
    // timestamps: false
});
Exercise.belongsToMany(Client, {
    as: 'clients',
    through: Client_exercise,
    // don't forget to reverse the informations
    foreignKey: 'exercise_id',
    otherKey: 'client_id',
    // timestamps: false
});

Theme.belongsToMany(Doc, {
    as: 'docs',
    through: 'theme_doc',
    foreignKey: 'theme_id',
    otherKey: 'doc_id',
    timestamps: false
});
Doc.belongsToMany(Theme, {
    as: 'themes',
    through: 'theme_doc',
    // don't forget to reverse the informations
    foreignKey: 'doc_id',
    otherKey: 'theme_id',
    timestamps: false
});

Exercise.belongsToMany(Theme, {
    as: 'themes',
    through: 'exercise_theme',
    foreignKey: 'exercise_id',
    otherKey: 'theme_id',
    timestamps: false
});
Theme.belongsToMany(Exercise, {
    as: 'exercises',
    through: 'exercise_theme',
    // don't forget to reverse the informations
    foreignKey: 'theme_id',
    otherKey: 'exercise_id',
    timestamps: false
});


module.exports = { Client, Responsibility, Kind, Picture, Possible_answer, Question, Exercise, Doc, Theme };