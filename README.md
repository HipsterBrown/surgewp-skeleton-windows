# SurgeWP Skeleton
SurgeWP Skeleton is a starting point for modern, professional WordPress development. Currently being battle tested at [SurgeWP](http://www.surgewp.com/). Intended to be used with [SurgeWP-Vagrant](https://github.com/SurgeWP/surgewp-vagrant).

  * **Version**: 0.0.2
  * **Contributors**:
    * Connor Black 
      * Github: [@connorblack](http://github.com/connorblack)
      * Twitter: [@connorjblack](https://twitter.com/connorjblack)
    * **Contributing**: We love contributors! Please submit pull requests against the master branch.

### What You Get

  * WordPress 3.8
  * [Roots](http://roots.io/) starter theme (with [Bootstrap](http://getbootstrap.com/) goodness)
  * [Grunt](http://gruntjs.com/) workflow
  * [Capistrano](http://www.capistranorb.com/) and deployment recipes
  * In the works:
    * Yeoman generator
    * Staging and production provisioning
  * Special thanks:
    * Mark Jaquith: [WordPress Skeleton](https://github.com/markjaquith/WordPress-Skeleton) and [WP-Stack](https://github.com/markjaquith/WP-Stack)

### Overview
  
  * `config/`: configuration for Capistrano deployment 
  * `content/`: theme development
  * `lib/`: ruby tasks
  * `shared/`: WordPress uploads
  * `vvv-init/`: scripts to configure vagrant for the new site
  * `wordpress/`: WordPress install
  * `Capfile`: Capistrano entry point
  * `Gruntfile.js`: Grunt workflow for roots-based starter theme
  * `index.php`: WordPress entry point
  * `local-config.php`: local development WordPress configuration file
  * `wp-config.php`: production WordPress configuration file

### Dependencies

1. Install Capistrano (must be 2.15.5) and friends: 
  
  ```
  $ sudo gem install capistrano -v "=2.15.5"
  ```

  ```
  $ sudo gem install capistrano-ext railsless-deploy
  ```

### Project Initialization

1. Change directories into the `www/` folder in your vagrant workspace (the folder where you cloned surgewp-vagrant) or the folder where you keep your github repositories if you're not using vagrant. For example:

  ```
  cd ~/username/surgewp-vagrant/www/
  // or 
  cd ~/username/github/
  ```
2. Copy the SurgeWP Skeleton into a new project folder:

  ```
  $ git clone https://github.com/SurgeWP/surgewp-skeleton.git <project name>
  ```
3. Change directories into the new project folder:

  ```
  $ cd <project name>
  ```  
4. Initialize the WordPress submodule:

  ```
  $ git submodule update --init
  ```
5. Create the uploads folder structure WordPress is expecting:

  ```
  $ mkdir -p shared/content/uploads/
  ```
6. Change the git remote to point towards your github repository (if it doesn't exist, log into your github account and create it):

  ```
  $ git remote set-url origin git://your.git.repository
  ```

### Vagrant Configuration

The folder `vvv-init/` contains scripts to configure the virtual hosts config, nginx config, and database config settings of your vagrant instance. Refer to the `README.md` inside this folder to run them for your specific site. 

### WordPress Installation and Configuration

1. `vvv-init/` should take care of database setup for vagrant. To hookup your WordPress install with the new vagrant database, edit the `local-config.php` file.

  ```
  define( 'DB_NAME', 'wordpress' ); // Change to the local database for this project
  define( 'DB_USER', 'root' ); 	    // Change to the user for that database
  define( 'DB_PASSWORD', 'root' ); 	// Change to the password for that user
  define( 'DB_HOST', 'localhost' ); // Probably 'localhost'
  ```
4. Visit the local vagrant URL in your browser to install WordPress (the hostname you defined in `vvv-init/vvv-hosts`):
  * The URL should look something like this: `your-hostname/wordpress/wp-admin/install.php`
5. After you install WordPress, log in and go to the `Settings -> General` section.
  * Find where it says `Site Address (URL)`.
  * Change it from `your-hostname.dev/wordpress` to `your-hostname.dev/`
  * Don't change the section `WordPress Address (URL)`!
6. WordPress should now be ready to go.

### Deployment with Capistrano
#### `config.rb`

1. Open `config/config.rb`.
2. Set your application title:

  ```
  set :application, "Appication title"
  ```
3. Set your github repository (if it's a public repo you can make the URL read only and you'll be fine. If it's private you'll have to either configure capistrano to use your public keys through ssh forwarding, or add a deploy key to the github repo https://help.github.com/articles/managing-deploy-keys):

  ```
  set :repository,  "Set your git repository location here"
  ```
4. Set where on the server the production files will be deployed to:
  
  ```
  set :production_deploy_to, '/www/example.com'
  ```
5. Set the domain name for staging:

  ```
  set :staging_domain, 'staging.example.com'
  ```
6. Set the user that Capistrano will use to SSH into the server with and set the sudo flag. Make sure it has all the necessary permissions (the easiest way is to create a "deployer" user on the server you're deploying to):

  ```
  set :user, "username"
  set :use_sudo, true
  ```
7. Give the proper database credentials:

  ```
  set :wpdb do
  	{
  		:production => {
  			:host     => 'PRODUCTION DB HOST',
  			:user     => 'PRODUCTION DB USER',
  			:password => 'PRODUCTION DB PASS',
  			:name     => 'PRODUCTION DB NAME',
  		},
  		:staging => {
  			:host     => 'STAGING DB HOST',
  			:user     => 'STAGING DB USER',
  			:password => 'STAGING DB PASS',
  			:name     => 'STAGING DB NAME',
  		}
  	}
  end
  ```
  
#### `staging.rb`
1. Open `config/staging.rb`.
2. Set on the server where the staging files will be deployed to:

  ```
  set :deploy_to, "/www/example.com"
  ```
3. Set the staging server domain address:

  ```
  role :web, "00.000.0.00"
  ```
  
#### `production.rb`
1. Open `config/production.rb`.
2. Set on the server where the production files will be deployed to:

  ```
  set :deploy_to, "/www/example.com"
  ```
3. Set the production server domain address:

  ```
  role :web, "00.000.0.00"
  ```

### Finalizing

1. Install NPM dependencies:

  ```
  npm install
  ```
2. Start Grunt and make changes to the starter theme:
  
  ```
  grunt watch
  ```
3. Push your code:
  
  ```
  $ git add .
  $ git commit -m "commit message"
  $ git push -u origin --all
  ```
4. Run Capistrano setup and deploy to staging:
  
  ```
  $ cap deploy:setup
  $ cap staging deploy
  ```
5. Other Capistrano commands:
  
  ```
  $ cap production deploy # Deploys to production
  $ cap deploy:rollback   # Rolls back the last deploy
  ```
  
