# SurgeWP Skeleton
SurgeWP Skeleton is a starting point for modern, professional WordPress development. Currently being battle tested at [SurgeWP](http://www.surgewp.com/). Intended to be used with [SurgeWP-Vagrant](https://github.com/SurgeWP/surgewp-vagrant).

  * **Version**: 0.1.0
  * **Contributors**:
    * Connor Black 
      * Github: [@connorblack](http://github.com/connorblack)
      * Twitter: [@connorjblack](https://twitter.com/connorjblack)
    * **Contributing**: We love contributors! Please submit pull requests against the master branch.

### What You Get

  * WordPress 3.6.1
  * [Roots](http://roots.io/) starter theme (with [Bootstrap](http://getbootstrap.com/) goodness)
  * [Grunt](http://gruntjs.com/) workflow
  * [Capistrano](http://www.capistranorb.com/) and deployment recipes
  * In the works:
    * Incorporation with Vagrant: [SurgeWP Vagrant](https://github.com/SurgeWP/surgewp-vagrant)
    * Yeoman generator
    * Staging and production provisioning
  * Special thanks:
    * Mark Jaquith: [WordPress Skeleton](https://github.com/markjaquith/WordPress-Skeleton) and [WP-Stack](https://github.com/markjaquith/WP-Stack)

### Overview
  
  * `config/`: configuration for Capistrano deployment 
  * `content/themes/`: theme development
  * `content/plugins/`: plugin development
  * `lib/`: ruby tasks
  * `shared/`: WordPress uploads
  * `WordPress-Dropins/`: utilized plugins
  * `wp/`: WordPress install
  * `Capfile`: Capistrano entry point
  * `Gruntfile.js`: Grunt workflow for roots-based starter theme
  * `index.php`: WordPress entry point
  * `local-config.php`: local development WordPress configuration file
  * `wp-config.php`: production WordPress configuration file

### Dependencies

1. Install Capistrano and friends: 
  
  ```
  $ sudo gem install capistrano capistrano-ext railsless-deploy
  ```

### Project Initialization

1. Change directories into the folder where you keep your github repositories. For example:

  ```
  $ cd ~/username/github/
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

### WordPress Installation

1. If a local database doesn't exist for this project yet, go ahead and create it (refer to the SurgeWP bible "Creating a local database with phpMyAdmin" if you need help).
2. Open your `local-config.php` file and add the correct database credentials.
3. If you haven't set up your `vhost` settings for this project yet, go ahead and do it now (refer to the SurgeWP bible "Configuring a project's local vhost in XAMPP" if you need help).
4. Once you have your `vhost` configured for this project, you should be able to visit the local URL to install WordPress.
  * The URL should look something like this: `local.project-name.dev/wp/wp-admin/install.php`
5. After you install WordPress, log in and go to the `Settings -> General` section.
  * Find where it says `Site Address (URL)`.
  * Change it from `local.project-name.dev/wp` to `local.project-name.dev`
  * Don't change the section `WordPress Address (URL)`!
6. WordPress should now be ready to go.

### Deployment with Capistrano
#### `config.rb`

1. Open `config/config.rb`.
2. Set your application title:

  ```
  set :application, "Appication title"
  ```
3. Set your github repository (make sure it's read only, or else you'll have to add a deploy SSH key to github):

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
6. Set the user that Capistrano will use to SSH into the server with and set the sudo flag. Make sure it has all the necessary permissions (you'll almost always use your username which should have the proper permissions):

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
1. Edit the `.gitignore` to look like this:

  ```
  /shared
  /sql-dump-*.sql
  /db-sync
  /content/upgrade/
  /node_modules/
  ```
2. Install NPM dependencies:

  ```
  npm install
  ```
3. Start Grunt and make changes to the starter theme:
  
  ```
  grunt watch
  ```
4. Push your code:
  
  ```
  $ git add .
  $ git commit -m "commit message"
  $ git push -u origin --all
  ```
5. Run Capistrano setup and deploy to staging:
  
  ```
  $ cap deploy:setup
  $ cap staging deploy
  ```
6. Other Capistrano commands:
  
  ```
  $ cap production deploy # Deploys to production
  $ cap deploy:rollback   # Rolls back the last deploy
  ```
  
