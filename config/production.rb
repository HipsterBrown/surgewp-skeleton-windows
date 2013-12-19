# SurgeWP Capistrano production deployment file

# Username and password for the production server

set :user, "username"
set :password, "password"
set :use_sudo, true

# Where should the site should deploy to
set :deploy_to, "/www/example.com"

# Now configure the servers for this environment

role :web, "0.0.0.0"

# Branch to be used for production

set :branch, "master"

