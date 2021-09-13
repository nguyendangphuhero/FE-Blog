import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {
  Container,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useFormik } from 'formik';

import { gql, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: CreatePostMutationInput!) {
    createPost(input: $input) {
      post {
        url
        title
        content
        isDraft
      }
      errors {
        field
        messages
      }
    }
  }
`;

const useStyles = makeStyles({
  root: {
    marginTop: '2rem',
  },
  input: {
    marginBottom: '2rem',
  },
  switchContainer: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  buttonMargin: {
    marginRight: '1rem',
  },
  errorText: {
    color: '#f44336',
    fontSize: '0.75rem',
    marginTop: '3px',
    textAlign: 'left',
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
});

function CreatePostPage() {
  const classes = useStyles();
  const location = useLocation();

  const [message, setMessage] = useState(null);

  const [addChannel, { data }] = useMutation(CREATE_POST_MUTATION);

  useEffect(() => {
    if (data == null) return;

    const { post } = data.createPost;

    if (post != null) {
      setMessage({
        type: 'success',
        content: 'Create post success!',
      });
    } else {
      setMessage({
        type: 'error',
        content: 'Create post fail!',
      });
    }
  }, [data]);

  const onCancel = () => {
    location.push('/');
  };

  const onSubmit = (values) => {
    const { isDraft, content, title } = values;
    const input = { title, content, isDraft };
    addChannel({
      variables: {
        input,
      },
    });
  };

  const hasError = (error) => error != null && error !== '';
  const isBlank = (text) => text == null || text.trim().length === 0;

  const validate = (values) => {
    const errors = {};
    const { title, content } = values;

    if (isBlank(title)) {
      errors.title = 'Title must not be blank';
    }

    if (isBlank(content)) {
      errors.content = 'Content must not be blank';
    }

    return errors;
  };

  const formik = useFormik({
    onSubmit,
    validate,

    initialValues: {
      content: '',
      title: '',
      isDraft: true,
    },
  });

  return (
    <Container maxWidth="md" className={classes.root}>
      {message && (
        <Alert severity={message.type} onClose={() => setMessage(null)}>
          {message.content}
        </Alert>
      )}

      <Box>
        <TextField
          fullWidth
          className={classes.input}
          label="Title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          type="text"
          error={hasError(formik.errors.title)}
          helperText={formik.errors.title}
        />
      </Box>

      <Box>
        <CKEditor
          editor={ClassicEditor}
          data={formik.values.data}
          onChange={(_, editor) => {
            const data = editor.getData();
            formik.setFieldValue('content', data);
          }}
        />
        {hasError(formik.errors.content) && (
          <FormHelperText error>{formik.errors.content}</FormHelperText>
        )}
      </Box>

      <Box className={classes.switchContainer}>
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.isDraft}
              name="isDraft"
              onChange={formik.handleChange}
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Is draft"
        />
      </Box>

      <Box>
        <Button
          className={classes.buttonMargin}
          variant="outlined"
          color="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          disabled={!formik.isValid}
          variant="outlined"
          color="primary"
          onClick={formik.handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Container>
  );
}

export default CreatePostPage;
