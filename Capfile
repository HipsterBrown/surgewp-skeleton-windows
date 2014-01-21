require 'rubygems'
require 'railsless-deploy'
load 'deployment/lib/misc'

# Multistage
set :stages, ['production', 'staging']
set :default_stage, 'production'
require 'capistrano/ext/multistage'

load 'deployment/lib/tasks'
load 'deployment/lib/deploy' # Loads config/config.rb after
load 'deployment/lib/deploy-after'
