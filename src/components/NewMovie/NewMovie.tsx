import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const checkFormat = (value: string) => pattern.test(value);

  function allFieldsNotEmpty() {
    return Boolean(
      title.trim() && imdbUrl.trim() && imgUrl.trim() && imdbId.trim(),
    );
  }

  function validateFields() {
    return checkFormat(imgUrl) && checkFormat(imdbUrl);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    // Changing the key (count) will remount the form and reset internal state automatically,
    // so explicit reset() is redundant
    setCount(prev => prev + 1);
  };

  const canSubmit = allFieldsNotEmpty() && validateFields();

  return (
    <div>
      <h2>Add a movie</h2>

      <form key={count} onSubmit={handleSubmit}>
        <TextField name="title" value={title} required onChange={setTitle} />

        <TextField
          name="description"
          value={description}
          onChange={setDescription}
        />

        <TextField
          name="imgUrl"
          label="Image URL"
          value={imgUrl}
          required
          checkUrlFormat={checkFormat}
          onChange={setImgUrl}
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={imdbUrl}
          required
          checkUrlFormat={checkFormat}
          onChange={setImdbUrl}
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          value={imdbId}
          required
          onChange={setImdbId}
        />

        <button type="submit" disabled={!canSubmit}>
          Add
        </button>
      </form>
    </div>
  );
};
