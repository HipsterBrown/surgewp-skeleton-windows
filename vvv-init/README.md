### Configuring VVV-init for a new project

1. Add your virtual hosts to `vvv-hosts`
2. Add your site name and database name in `vvv-init.sh`
3. Add your server name and path to project folder in `vvv-nginx.conf`
4. Add your URL in `wp-cli.yml`
5. Run `vagrant reload --provision`

Vagrant will parse your project directories for these files, edit your host computer's virtual hosts, create a database on your vagrant instance, and add this server to your vagrant instance's nginx configuration.

Now you should be able to visit `http://your-site-name/wordpress/wp-admin/install.php` to finish setting up your WordPress project.

