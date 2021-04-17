import { BASE_URL } from './AuthApi';

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

class Api {
    constructor({ url, headers }) {
        this._url = url
        this._headers = headers
    };

    _parsAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // 1. Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._parsAnswer)
        // .then((res) => {
        //     console.log(res)
        // })
    };

    getSavedMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._parsAnswer)
        // .then((res) => {
        //     console.log(res)
        // })
    };


    // 3. Редактирование профиля
    editUserInfo(inputData) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputData.name,
                email: inputData.email
            })
        })
            .then(this._parsAnswer)
    }

    // 4. Сохранение фильма
    createMovie(data) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._headers,

            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailer: data.trailerLink,
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            })
        })
            .then(this._parsAnswer)
    }

    createSavedMovie(data) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._headers,

            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: data.image,
                trailer: data.trailer,
                thumbnail: data.thumbnail,
                movieId: data.movieId,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            })
        })
            .then(this._parsAnswer)
    }

    // 7. Удаление фильма
    deleteMovie(_id) {
        return fetch(`${this._url}/movies/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._parsAnswer)
    }

    refreshHeaders() {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
}

export const mainApi = new Api({
    url: BASE_URL,
    headers: headers
});
