# Spring Leaderboard (Laravel|PHP)

## Run Project
```shell
npm run dev
php artisan serve
php artisan queue:work
```

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


  
## Database Model

- New Model
    ```shell
    php artisan make:model Winner -m
    ```

- Add Migration
    ```shell
    php artisan make:migration add_columns_to_users_table --table=users
    ```
  
## Model Factory

Populate
```shell
php artisan db:seed
```

## Create Controller
```shell
php artisan make:controller UserApiController
```

## Laravel Commands
- Create
    ```shell
    php artisan make:command ResetUserPoints
    ```
  
- Run
    ```shell
    php artisan users:reset-user-points
    ```

## Create Job
- Create
    ```shell
    php artisan make:job GenerateQRCodeJob
    ```

- Run worker
    ```shell
    php artisan queue:work
    ```
  
## Job Scheduler
- Location: `routes/console.php`

- List Schedulers
    ```shell
    php artisan schedule:list
    ```

- Run Scheduler
    ```shell
    php artisan schedule:run
    ```


## Storage Directory

- Create a symlink
```shell
php artisan storage:link
```

## Clear cache
```shell
php artisan route:cache
php artisan config:clear
php artisan cache:clear
```

## Add dependencies
```shell
composer require guzzlehttp/guzzle
```

