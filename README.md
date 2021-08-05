<img src="./Logo.svg">

![license](https://img.shields.io/github/license/oslabs-beta/Breach?color=blue) ![version](https://img.shields.io/badge/version-1.0.0-forestgreen) ![lastcommit](https://img.shields.io/github/last-commit/oslabs-beta/Breach?color=red) ![gitcontribute](https://img.shields.io/github/contributors/oslabs-beta/Breach) ![gitstars​](https://img.shields.io/github/stars/oslabs-beta/Breach?style=social) ![gitforks](https://img.shields.io/github/forks/oslabs-beta/Breach?style=social)

Visit the Breach website [here](https://breachapplication.netlify.app/)

## Table of Contents
- <a href="#about">About Breach</a>
- <a href="#getting-started">Getting Started</a>
- <a href="#demo">Demo</a>
  - <a href="#url">Scan URL</a>
  - <a href="#results">Results</a>
  - <a href="#history">History</a>
  - <a href="#settings">Settings</a>
- <a href="#looking-ahead">Looking Ahead</a>
- <a href="#contributors">Contributors</a>
- <a href="#license">License</a>

## About <a id="about"></a>

Breach is an electron-based Cybersecurity application intended to keep front-ends safe without doing damage.

• One click for URL security test.

• Saves history of previous tests

• Customizable settings on color and font sizes for better user experience.

## Getting Started <a id="getting-started"></a>

### Download [Breach](https://breachapplication.netlify.app/) and [BreachServer](https://github.com/tommyedmunds/breachServer)

The application can be downloaded for [windows](https://drive.google.com/file/d/145yAP5TmEQ5Ti9ohv3nl3cAHoqawgV2Q/view?usp=sharing) or [mac](https://drive.google.com/file/d/1kRA23lBGhJ-vXaD8gVmvyWeAOaZuZmFR/view?usp=sharing) (Linux option for packaging from codebase is not confirmed.)

-  For Mac OSX, right click on the downloaded file and click open. 
-  For Windows users, simply open the .exe file to begin.

The server can be forked and cloned to your local machine. Once it has been cloned, navigate to the correct folder in your terminal and

- Type the following:

```

npm install

npm start

```
Once you have these two items up and running you can get started or use our demo to learn more. We suggest changing the color of the application to your preference first.

## Demo <a id="demo"></a>

Once you have opened [Breach](https://breachapplication.netlify.app/) and [BreachServer](https://github.com/oslabs-beta/BreachServer)...

### Scan URL <a id="url"></a>
Upon entering a URL the app sends out a request to the server, running tests for instances of innerHTML in the code, cookies and some XSS tests. 
#### Writing the URL for testing XSS 
- The URL must be formatted for a search query (have "q=") in order for the XSS tests to be run. 

![image](https://miro.medium.com/max/480/0*I_4NbNZs3mlLrnEB)

#
### Results <a id="results"></a>
When the app is finished loading, it will print your results. 
- Click on the defend logo to learn more about how to defend your app.

![image](https://miro.medium.com/max/480/0*mK9YJOS5qRCbsmj5)
#
### History <a id="history"></a>
- You may view the history of results, change how many are shown, delete history items, or check out how to defend from attacks in the History tab of the application.

![image](https://miro.medium.com/max/480/0*PU2oFHccXRkpfyYW)
#
### Settings <a id="settings"></a>
- From the settings page you can change the color of the application to one of five different settings, as well as change the font size on the pages.

![image](https://miro.medium.com/max/480/0*ME6_mHgysoCqLbeh)

## Looking Ahead <a id="looking-ahead"></a>

Breach is currently in its first release. The features we would like to implement in the future are:
- Testing for SQL injection and DOS susceptibility.
- Ability to export data for future use.
- Display of active ports running on the server.
- Integrate server into app.
- Linux installer.

## Contributors <a id="contributors"></a>

[Jason Yoon](https://www.linkedin.com/in/jason-t-yoon/) [@Jason Yoon](https://github.com/jasony779)

[Tommy Edmunds](https://www.linkedin.com/in/tommy-edmunds-a91aa41a9/) [@Tommy Edmunds](https://github.com/tommyedmunds)

[Michael Geismar](https://www.linkedin.com/in/michael-geismar-46707b7a/) [@michaelgeismar](https://github.com/MichaelGeismar)

## License <a id="license"></a>

MIT -- see [LICENSE.md](https://github.com/oslabs-beta/Breach/blob/main/LICENSE) file for more details.

#
This product is accelerated by [OS Labs](https://opensourcelabs.io/).
