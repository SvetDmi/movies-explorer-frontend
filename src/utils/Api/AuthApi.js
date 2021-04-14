export const BASE_URL = 'https://api.svetdmi2.students.nomoredomains.monster';
// export const BASE_URL = 'http://localhost:4000';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name, email, password })
    })
        .then((res => {
            let data = res.json();
            if (!res.ok) {
                return Promise.reject({ code: res.status });
                // console.log(res.status)
            }
            return data;
        }))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            }
        })
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password })
    })
        .then((res => {
            let data = res.json();
            if (!res.ok) {
                return Promise.reject({ code: res.status });
            }
            return data;
        }))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            }
        })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => data)

};
