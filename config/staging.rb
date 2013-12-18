# SurgeWP Capistrano staging deployment file

# Where should the site should deploy to
set :deploy_to, "/www/example.com"

# Now configure the servers for this environment

# OPTION 1

role :web, "0.0.0.0"
# role :web, "second web server here"
# role :web, "third web server here, etc"

# role :memcached, "your memcached server IP address or hostname here"
# role :memcached, "second memcached server here, etc"

# OPTION 2

# If your web servers are the same as your memcached servers,
# comment out all the "role" lines and use "server" lines:

# server "your web/memcached server IP address or hostname here", :web, :memcached
# server "second web/memcached server here", :web, :memcached
