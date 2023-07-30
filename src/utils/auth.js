
export const url = 'https://auth.nomoreparties.co';

export const register = ({ email, password }) => {

    return fetch(`${url}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({email, password})
    })
        .then((res) => {
            return res;
        })
        .catch(console.error);

};

export const authorize = ({ email, password }) => {

    return fetch(`${url}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({email, password})
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            
            if(data.token) {
                localStorage.setItem('jwt', data.token);
                console.log(data.token);
                return data;
            }
                

        })
        .catch(console.error)


}

export const getContent = (token) => {
    return fetch(`${url}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((res) => res.json())
}