### Before installing dependencies, you need to install node v13

### Справка по состоянию

Старая версия прокета работала на TRON блокчейн, сейчас же проект переходит на BTTC, соответсвенно TRON Wallet был удалён. Вместо TRON`a нужно подключить MetaMask и сменить сеть на BTTC.

На данный момент проект ождиает доработок бека. После завершения работ на беке необходимо:
- Подключить авторизацию через метамаск
- Проверить актуальность адресов контрактов
- Проверить работоспособность контрактов
- Проверить корректоность данных приходящих с бека

#### Project structure
- `components` - contains react components. They can't have own state and business logic. Should be developed in storybook.
- `containers` - containers use components, adding business logic for them
- `store` - all data and global business logic placed here. Separate folder for each reducer
- `utils` - common functions for project
- `hooks` - common business logic, that can be reused between containers.


#### How to start

```bash
# install dependencies
yarn

# start dev server
yarn start

# run build
yarn build 
```


