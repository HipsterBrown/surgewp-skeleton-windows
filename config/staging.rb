# SurgeWP Capistrano staging deployment file

# Username and password for the staging server

set :user, "root"
set :use_sudo, true

# Where should the site should deploy to
set :deploy_to, "/www/example.com"

# Now configure the servers for this environment

# OPTION 1

role :web, "54.213.141.81"

# Branch to be used for staging

set :branch, "staging"

