# SSML-Editor

The SSML Editor App is a user-friendly web application built with the Quasar Framework for creating and editing Speech Synthesis Markup Language (SSML). It provides a graphical interface to design SSML content and integrates with the [SSML-Editor Server](https://github.com/micha997/ssml_editor_server) for converting the SSML input into high-quality audio files using the Google Cloud Text-to-Speech API.

This project was developed as part of a class at the **University of Applied Sciences Düsseldorf (Hochschule Düsseldorf - HSD)**.

## Requirements
- Node.js
- The SSML-Editor Server running locally or hosted

## Installation
```bash
git clone https://github.com/micha997/ssml_editor.git
cd ssml_editor
```

## Install Dependencies
```bash
npm install
```

## Usage
### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
npm run build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
