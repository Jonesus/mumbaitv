# Mumbai TV

The proper successor to [Bombay TV](http://www.bombay-tv.net/), an oldschool video subtitling platform. Mumbai TV is a platform for subtitling and sharing short (generally <30s) pre-submitted videos.

All videos available on the platform are to be considered as "Fair Use" as the goal of the platform is to provide humour, entertainment and enjoyment to its users and will never be monetized in any way.

![Screenshot of the front page](https://i.imgur.com/CTDpU4u.jpg)

## Table of contents

1. [Running the app locally](#running-the-app-locally)
2. [Technical implementation](#technical-implementation)
3. [Contributing](#contributing)

## Running the app locally

1. Clone the repo to your machine `git clone git@github.com:Jonesus/mumbaitv.git`
2. Run `npm install` to install project dependencies
3. Run `npm run dev` to start the development server
4. Open a browser to `http://localhost:3000`

If you want to fork this project, it is recommended to host your own media to be subtitled, as there is be no guarantee that the currently available video clips will be there in the future.

## Technical implementation

Mumbai TV is a server-side rendered [Next.js](https://github.com/zeit/next.js) app hosted on [Now.sh](https://zeit.co/home) built using [TypeScript](https://github.com/microsoft/TypeScript) and [Styled Components](https://github.com/styled-components/styled-components). The core functionality (creating and viewing subtitled videos) works completely in-browser with all necessary data stored in the URLs. Videos, their thumbnails and initial subtitling timestamps are fetched from a remote file server that includes no other logic than serving files.

The only backend functionality comes from being able to "save" subtitles as cleaner short urls and from being able to give videos a title for public listing on the website. This mostly-backendless approach allows for quite private sharing of inside-jokes for example, as sharing a raw and long URL leaves nothing behind anywhere in the app architecture.

The editor exposes the subtitles to a `<video>` element in [WebVTT](https://www.w3.org/TR/webvtt1/) format encoded as Base64. The curious minds can extract and decode it from the rendered html code, or by grabbing the `sub` query parameter from an already subtitled video!

## Contributing

All contributions to the codebase are welcome! If you find any bugs don't hesitate to open an issue or a PR. When opening an issue, please try to include step-by-step instructions on how to reproduce the problem you got, so that figuring out a fix is feasible.
