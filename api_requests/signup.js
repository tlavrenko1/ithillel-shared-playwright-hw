export class Signup {

    async register(name, lastName, email, password) {
        request.post('https://qauto.forstudy.space/api/auth/signup', {
            body: {
                name: name,
                lastName: lastName,
                email: email,
                password: password,
                repeatPassword: password
            }
        })
    }
}