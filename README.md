# Spring Leaderboard (Laravel|PHP)

## Project Kickstart
- Start Project:
    ```shell
    laravel new sprint-leaderboard
    ```

- Migrate
    ```shell
    php artisan migrate
    ```

- Run Server
    ```shell
    php artisan serve
    ```

  
## Update Model

- Add Migration
    ```shell
    php artisan make:migration add_columns_to_users_table --table=users
    ```
  
## Model Factory

Populate
```shell
php artisan db:seed
```

## Commands
- Create
    ```shell
    php artisan make:command ResetUserPoints
    ```
  
- Run
    ```shell
    php artisan users:reset-user-points
    ```
  

## Clear cache
```shell
php artisan route:cache
php artisan config:clear
php artisan cache:clear
```

