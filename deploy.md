
[env-key]
>> composer install --no-dev
>> cp .env.example .env
>> php artisan key:generate //remove if key exists in .env
>> php artisan storage:link

[PermissionsOnLinux]
>> sudo chown -R $USER:www-data storage
>> sudo chown -R $USER:www-data bootstrap/cache
>> sudo chmod -R 775 storage
>> sudo chmod -R 775 bootstrap/cache

[PermissionsOnMac]
>> sudo chown -R $USER:_www storage
>> sudo chown -R $USER:_www bootstrap/cache
>> sudo chmod -R 775 storage
>> sudo chmod -R 775 bootstrap/cache

[migration]
>> php artisan migrate
>> php artisan passport:install
 
[Seeding]
php artisan db:seed --class=RolesSeeder
php artisan db:seed --class=AdminSeeder
 
php artisan db:seed --class=CategoriesSeeder 
php artisan db:seed --class=OptionsSeeder 
php artisan db:seed --class=AmenitiesSeeder 

[Credentials]
'email'=>"medicci@florence.com", 
'name'=>"Elijah", 
'password'=>Hash::make('qwqwqw') 
