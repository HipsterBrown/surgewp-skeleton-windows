### Configuring VVV-init for a new project

1. Add your virtual hosts to `vvv-hosts`
2. Set your site name and database name in `vvv-init.sh`
3. Add your server name and path to project folder in `vvv-nginx.conf`
4. Add your URL in `wp-cli.yml`
5. Run `vagrant reload --provision`

Now you should be able to visit `http://your-site-name/wordpress/wp-admin/install.php` to finish setting up your WordPress project.

