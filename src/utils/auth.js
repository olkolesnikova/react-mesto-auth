
export const url = 'https://auth.nomoreparties.co';

export const register = ({ email, password }) => {

    return fetch(`${url}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({ email, password })
    })
        .then((res) => {
            return res;
        })
        .catch(console.error);

};