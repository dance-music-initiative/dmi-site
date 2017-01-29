# DMI Website

The CSS uses viewport units, which precludes it from working in these browsers:

[caniuse](http://caniuse.com/#search=vmin)

- Internet Explorer 8
- Opera Mini 8

## Development

This section should help someone get up-and-running for developing the site.

### First Time Setup

Be sure to install the follwing:

1. A git client (like [GitHub Desktop](https://desktop.github.com/)).
2. Node.js v6.4+ (https://nodejs.org/en/)

After those items are installed, it is time to clone this repository and install dependencies.

1. Clone this repository ([Cloning a repo using GitHub Desktop](https://help.github.com/desktop/guides/contributing/cloning-a-repository-from-github-to-github-desktop/)).
2. Open a terminal to the folder you just cloned into.
3. Run `npm install` from within that folder.

After these steps you are ready to work!

### Folder Structure

The folders in the project are described below:

- `html/` - This is the .ejs templates for any html files.
- `images/` - All the images used in the site.
- `js/` - The source javascript files.
- `less/` - The source less stylesheets.
- `public/` - This folder is created on build and contains the compiled site output.

### Auto-rebuild and dev server

If you are looking to work on the site, there is a handy script setup that will start
a development server to test changes on as well as rebuilding the site as you save files.

You can run the development server by opening a terminal to the folder location you checked
out this repository into and running: `npm run dev`.

Make sure to commit any changes you make!

### Build for release

If you need to create a new build to be deployed onto the production servers, you can
simply open a terminal to the folder you cloned this repository into and run `npm start`.
That will build all the site files to the `public/` folder, the contents of which can
be uploaded directly to the S3 bucket.

## TODO:

- Fix Internet Explorer...
