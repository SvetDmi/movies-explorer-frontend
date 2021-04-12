// Страница логина пользователя
const ERROR400Signin = "Вы ввели неправильный логин или пароль";

const ERROR401Signin = "При авторизации произошла ошибка. Токен не передан или передан не в том формате";

const ERROR403Signin = "При авторизации произошла ошибка. Переданный токен некорректен";

// Страница регистрации пользователя
const ERROR400Signup = "При регистрации пользователя произошла ошибка";

// Страница обновления профиля
const ERROR400Profile = "При обновлении профиля произошла ошибка";

// регистрация и профиль

const ERROR409 = "Пользователь с таким email уже существует";

// Другое
const ERROR500 = "На сервере произошла ошибка";

const ERROR404 = "Страница по указанному маршруту не найдена";

module.exports = {
    ERROR400Signin,
    ERROR401Signin,
    ERROR403Signin,
    ERROR400Signup,
    ERROR400Profile,
    ERROR409,
    ERROR500,
    ERROR404

};
