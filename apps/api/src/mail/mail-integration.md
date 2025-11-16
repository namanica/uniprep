# Simple mail integration

Це на випадок якщо я не попаду на сходку.

Тут головна логіка gmail що може надіслати лист на пошту. У майбутньому можна зробити красіво і прикольно, прив'язавши до юзера.

## Процес

1. Налаштування вашого акаунта google

Це обов'язково, без цього не буде працювати. Цей застосунок надсилає листи з від вашого ім'я.

- Треба мати 2FA на акаунті
- Після цього треба перейти на [Паролі додатків (App passwords)](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://myaccount.google.com/apppasswords&ved=2ahUKEwishffOw_aQAxViS_EDHfx-DIwQFnoECB0QAQ&usg=AOvVaw1rVibBR6kQTiUjqa0l_f8W)
- Там створити новий пароль і скопіювати кудись (якщо закриєте, то більш не відкриєте і треба створювати новий).

2. Встановлюєте пакети (або просто npm i якщо я закомітила зміни)

```bash
npm install nodemailer
npm install @nestjs/config (для роботи env)
```

3. Створюєте mail module і service. Додаєте їх у головні файли app. Також створіть .енв, значення без лапок

```bash
GMAIL_USER=yourgmail@gmail.com
GMAIL_PASS=abcd efgh ijkl mnop
```

4. Якщо все кул, то запускаєте програмку

```bash
npm run dev
```

і робите запит Post http://localhost:8000/send-test (я робила через postman) з тілом

```bash
{
  "email": "yourgmail@gmail.com"
}
```
