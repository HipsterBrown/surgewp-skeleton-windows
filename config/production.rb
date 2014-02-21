# SurgeWP Capistrano production deployment file

# Username and password for the production server

set :user, "root"
set :use_sudo, true

# Where should the site should deploy to
set :deploy_to, "/www/example.com"

# Now configure the servers for this environment

role :web, "54.213.141.81"

# Branch to be used for production

set :branch, "master"

