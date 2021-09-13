import { useMutation } from '@apollo/client';
import { Container } from '@material-ui/core';
import gql from 'graphql-tag';

const UPLOAD_AVATAR_MUTATION = gql`
  mutation UpdateUserAvatar($file: Upload!) {
    updateUserAvatar(input: { avatar: $file }) {
      user {
        avatar
      }
    }
  }
`;

const UploadFile = () => {
  const [updateUserAvatar] = useMutation(UPLOAD_AVATAR_MUTATION, {
    onCompleted: (data) => console.log(data),
  });

  const handleFileChange = (e) => {
    const { files } = e.target;

    if (files.length === 0) return;

    const file = files[0];

    updateUserAvatar({ variables: { file } });
    window.location.reload();
  };

  return (
    <Container>
      <div>
        <h1>Upload file</h1>
        <input type="file" multiple required onChange={handleFileChange} />
      </div>
    </Container>
  );
};

export default UploadFile;
