import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import SignIn from 'src/auth/presentation/components/SignIn';
import * as signInModule from 'src/auth/presentation/state-modules/sign-in';
import NextPage from 'src/common/domain/model/NextPage';

const SignInPage: NextPage = () => {
  const dispatch = useDispatch<Dispatch<signInModule.Action>>();

  const [email, updateEmail] = React.useState("");
  const [password, updatePassword] = React.useState("");
  const submit = React.useCallback((e: string, p: string) => {
    dispatch(signInModule.signIn({
      email: e,
      password: p
    }))
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

SignInPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'noti'],
})

export default SignInPage;