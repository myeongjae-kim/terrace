import * as React from 'react';
import SignIn from 'src/auth/presentation/components/SignIn';
import NextPage from 'src/common/domain/model/NextPage';

const SignInPage: NextPage = () => {
  const [email, updateEmail] = React.useState("");
  const [password, updatePassword] = React.useState("");
  const submit = React.useCallback((e: string, p: string) => {
    console.log("email: ", e, ", password: ", p);
  }, [])

  const onChangeEmail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateEmail(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updatePassword(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(email, password);
  }

  return <SignIn onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} onSubmit={onSubmit} />;
}

export default SignInPage;