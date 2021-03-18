import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NavigationPrompt from 'react-router-navigation-prompt';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Question from 'src/containers/ExerciseManager/QuestionManager';
import ThemeManager from 'src/containers/ExerciseManager/ThemeManager';
import TextField from './TextField';
import Checkbox from './Checkbox';
import Modal from './Modal';
import CircleLoader from '../CircleLoader'
import './styles.scss';

const ExerciseManager = ({
  loading,
  updateLoading,
  error,
  changeValue,
  title,
  brief,
  questions,
  createQuestion,
  published,
  saveOnBlur,
  isSaved,
  createExercise,
  removeExercise,
  getExercise,
  createNew,
  resetManagerStates,
}) => {
  useEffect(() => {
    if (createNew) {
      createExercise();
    }
    else {
      getExercise();
    }
    return () => {
      resetManagerStates();
    };
  }, []);

  if (loading) {
    return (
    <div className="loading">
    <CircleLoader
      colour={"#7ED8F7"}
      radius={100}
      duration={2}
      strokeWidth={20} />
    </div>
    );
  }

  if (error) {
    return (<p>Il y a eu un problème</p>);
  }

  return (
    <section className="admin-exercise">
      <NavigationPrompt when={!published}>
        {({ onConfirm }, onCancel) => (
          <Modal
            onConfirm={onConfirm}
            onCancel={onCancel}
            removeExercise={removeExercise}
          />
        )}
      </NavigationPrompt>
      <h1 className="admin-exercise__heading-page">Créer un exercice</h1>
      <p>Statut de l'exercice : sauvegardé en brouillon</p>
      <form>
        <section>
          <article className="admin-exercise__general-info">
            <button
              className="admin-exercise__btn-remove"
              type="button"
              onClick={removeExercise}
            >
              Supprimer l'exercice
            </button>
            <Checkbox
              className="admin-exercise__question__general-info__field-group"
              id="exercise-published"
              label="Publié"
              type="checkbox"
              name="published"
              value={published}
              saveCheckboxChange={changeValue}
              updateState={saveOnBlur}
            />


            <TextField
              className="admin-exercise__general-info__field-group"
              id="exercise-title"
              label="Titre"
              type="text"
              autocomplete="off"
              name="title"
              value={title}
              changeValue={changeValue}
              isSaved={isSaved}
              saveOnBlur={saveOnBlur}
              updateLoading={updateLoading}
            />

            <label>Intro</label>
            <CKEditor
              editor={ClassicEditor}
              data={brief}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                changeValue({
                  value: data,
                  name: 'brief',
                });
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
                if (!isSaved) {
                  saveOnBlur({
                    name: 'brief',
                    value: brief,
                  });
                }
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />

            <ThemeManager />
          </article>

          {
            questions.map((question, index) => (
              <Question id={question.id} questionNumber={index + 1} key={question.id} />
            ))
          }

          <button
            className="admin-exercise__btn-add"
            type="button"
            onClick={createQuestion}
          >
            Ajouter une question supplémentaire
          </button>
        </section>
      </form>
    </section>
  );
};

ExerciseManager.propTypes = {
  loading: PropTypes.bool.isRequired,
  updateLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  changeValue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  brief: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  createQuestion: PropTypes.func.isRequired,
  published: PropTypes.bool.isRequired,
  saveOnBlur: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  createExercise: PropTypes.func.isRequired,
  removeExercise: PropTypes.func.isRequired,
  createNew: PropTypes.bool,
  getExercise: PropTypes.func.isRequired,
  resetManagerStates: PropTypes.func.isRequired,
};

ExerciseManager.defaultProps = {
  createNew: false,
};

export default ExerciseManager;
