# COSIMA/RAPIDMIX Challenge

This repository contains the code for the COSIMA challenge of the SIC
(http://sic.upf.edu/cosima-challenge/): RAPID-MIX and CoSiMa challenge 
participants to create a sonic experience for a crowd of people spontaneously
engaging together into a collaborative/collective performance, installation 
or soundwalk using their smartphones.

The code started from the Soundworks Application Template 
(https://github.com/collective-soundworks/soundworks/).

Inside the src/server folder you can find the code for the server which will handle
the interaction between the different devices. Inside the src/client folder
there are 2 folders: 

  - player: this colde will be executed when the users access the url
  (like http://localhost:8000)
  - shared-env: I created this folder to put the code that will handle the
  device connected to the projector/speakers 
  (the url would be http://localhost:8000/shared-env)

In order to run the project you have to:

```shell
npm install
npm run watch
```
