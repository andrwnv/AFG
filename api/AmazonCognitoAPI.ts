import { Auth } from "aws-amplify";

type UserFields = {
    username: string,
    phoneNumber?: string,
    email?: string,
    password: string,
}

export default class AmazonCognitoAPI {
    state: UserFields;

    setUserFields = (props: UserFields) => this.state = { ...props };

    SingIn = async (): Promise<boolean> => {
        return await Auth.signIn(this.state.username,
            this.state.password)
            .then(() => {
                console.log('[AmazonCognitoAPI]: SignIn successful!');
                return true;
            })
            .catch(error => {
                console.log('[AmazonCognitoAPI]: SignIn error!', error);
                return false;
            });
    }

    signUp = async (): Promise<boolean> => {
        const phone_number: string = this.state.phoneNumber !== undefined ? this.state.phoneNumber : '';
        const username: string     = this.state.username;
        const password: string     = this.state.password;
        const email: string        = this.state.email !== undefined ? this.state.email : '';

        return await Auth.signUp({
            username,
            password,
            attributes: {
                email,
                phone_number
            }
        }).then(() => {
            console.log('[AmazonCognitoAPI]: SignUp successful!');
            return true;
        })
            .catch(error => {
                console.error('[AmazonCognitoAPI]: Signup error', error);
                return false;
            });
    }

    confirmSignUp = async (smsCode: string): Promise<boolean> => {
        return await Auth.confirmSignUp(this.state.username, smsCode).then(() => {
            console.log('[AmazonCognitoAPI]: successful confirm singtup');
            return true;
        })
            .catch(error => {
                console.error('[AmazonCognitoAPI]: Error confirming signing up!', error);
                return false;
            });
    }
}
