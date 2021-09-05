# EpiCod App

Internal use frontend for EpiCod data.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Docker

Quick Docker image build:

1. `npm run build-all`
2. `ng build --configuration production`
3. `docker build . -t vedph2020/epicod-app:1.0.0 -t vedph2020/epicod-app:latest` (replace with the current version).

## Quick Start

To use the frontend test app:

1. if you have any bulk data as binary files ready to restore automatically when the app starts up the first time, create a directory for them, and place them in it. For instance, the default docker-compose script assumes that this directory is named `/var/epicod` (in a Linux host). Dump files are named like `00001_text_node.bin`, etc., one for each table; so you should end with a bunch of files like `/var/epicod/00001_text_node.bin`, etc.

2. save the `docker-compose.yml` script from this project somewhere.

3. if restoring bulk data (point 1 above), ensure that the bulk data directory in the script (under epicod-api volumes) is equal to the one you chose at #1 above. Please notice that in the script `/var/epicod:/var/epicod` means that the host directory `/var/epicod` is mapped to the container's directory with the same name. Of course it's not necessary that these directories are equal; just remember that the host directory is the first one, before the colon.

4. if you don't want your database to persist data even when containers are destroyed and recreated, in the script remove the volume under `epicod-pgsql`.

5. enter a terminal where you downloaded the `docker-compose.yml` script, and run `sudo docker-compose up`.

6. point your browser to <localhost:4200> to browse data.

Please **note** that this script assumes that no PostgreSQL service is running at its default port (5432). If this is not the case, e.g. because you have a preinstalled PostgreSQL in your Linux distro, you can either change the port in the script, remove the epicod-pgsql section altogether, or just stop the host's PostgreSQL service.
