# HExBot v0.2.10 - November 7 - 2021

Suite of scripts to automate some processes on Hacker Wars game website.

Hotsite: http://hotsitehexbot.blogspot.com.br/p/index.html

Youtube video: https://www.youtube.com/watch?v=fEfSukfb3Pc

## Privacy
This extension DO NOT collect any personal or sensitive information about the users. Check out the code. Open an issue if you have any question.

## Connection with the Internet

This extension is connected to a webserver called using the technology socket.io. Currently this server notifies when a new version is available. New features comming soon.

## History

Since 2015 this project has been a very popular bot amoung the Hacker Experience players. Now the original project was adapted to work on Hacker Wars. Thanks for all contributors.

## Overview

This must be installed as a Google Chrome extension.

Functionalities:
* Solves riddles path
* Performs game missions
    * Hard and medium missions
    * Very easy missions - Delete software missions
* Intercepts bank transactions
* Performs massive uploads
* Cleans logs
* Collects ips and software information around the network
* Notifies about new missions and strange log activities
* Tranfers earned money to BTC wallet automatically
* Custom user scripts (NEW)

## How to install
1. Go to chrome://extensions/
2. Check 'Developer mode' checkbox
3. Click on 'Load unpacked extension...'
4. Load the uncompressed directory

## Changelog

* v0.2.10 `create_file(name, content)` created for webcrawler.
* v0.2.9 Hexbot connected to version notify server.
* v0.2.8 email monitor added. Sounds added for important events.
* v0.2.7 accept mission button fixed. More puzzles.
* v0.2.6 more puzzles and cleaning logs fixed for missions.
* v0.2.5 more puzzles and missions fixed a little bit.
* v0.2.4 upload software fixed for webcrawler.
* v0.2.3 new puzzle added. (Renato's dog 💔)
* v0.2.2 intercept sequence fixed.
* v0.2.1 missions sequence fixed.
* v0.2 Adapted to Hacker Wars after [gresendesa](https://github.com/gresendesa) updated [jSpaghetti](https://github.com/gresendesa/jSpaghetti). Now it works on newer browsers. Webcrawler script editor now uses [Ace editor](https://ace.c9.io/). Bot connected to server using [socket.io](https://socket.io/) technology.
* v0.1.35.1
    * Webcrawler freehd error fixed
* v0.1.35
    * Webcrawler freehd error fixed (beta)
    * Translated to German
* v0.1.34 - Protection against CloudFlare page.
    * Bot reloads the page every 3 sec if there is a CloudFlare page.
    * New webcrawler functions added: clean_logs_just_after_installing(), clean_logs_disabled() and leave_signature().
* v0.1.33 - Webcrawler custom scripts (BETA)
* v0.1.32 - Bot button bevavior changed to open/close window. Wiki implemented.
* v0.1.31 - Settings area created and [MentalMushrooms suggestions](https://github.com/fkapitalism/HExBot/issues/2) implemented.
    * Checkbox to switch the behavior of poping up bot after instructions;
    * Webcrawler now adds automatically checked ips on "Ignore these ips" fields.
* v0.1.30 - Original bot deployed with chat removed for performance reasons.
* v0.1.26 - Delete software mission sequence implemented.
* v0.1.25.2 - Fixing last update issue. If skip hide upload logs option (webcrawler checkbox) was active and the installing failed then the upload logs would not be clear.
* v0.1.25.1 - Just some adjustments
* v0.1.25 - Added two checkboxes relating to the webcrawler and its uploads.
    * A checkbox to skip the log hide after upload (Straight to install after checking that it was uploaded successfully)
    * A checkbox to skip hiding the uploaded software (As well as the log hide since there is nothing to hide) after a successful install
* v0.1.24.1 - Buttons that desappear problem repaired
* v0.1.24 - Communication channel implemented
* v0.1.23 - Auto riddle path solver. Now the bot solves the riddles and it automatically upgrades the cracker during the process.
* v0.1.22.3 - Performance update
* v0.1.22.2 - Performance update
* v0.1.22.1 - Performance update
* v0.1.22 - Traduzido para o Português/ Translated to Portuguese
* v0.1.21 - Transfer the earned money to BTC wallet
    * Tranfer the earned money to BTC wallet during missions and bank camping
* v0.1.20.1 - Storage bug fixed
* v0.1.20 - CRITICAL SECURITY UPDATE
    * jSpaghetti update now allows the bot to use background script instead of sessionStorage what could be noticed by game server. The bot is already using background script as data storage.
    * sendXMLHttpRequest function was rewritten to optionally send the X-Requested-With header. It allows the bot to imitate the game behavior better, sending this header when necessary.
    * So the HE's technical guys will have more difficulty to track us.
    * Team, monitor the game requests headers and search for new headers. The HE's guys could create these headers to know who is not sending these headers (If the bot is not sending these headers, then it can be tracked).
* v0.1.19 - Ignore ips fields added
* v0.1.18.1 - jSpaghetti upgrade
* v0.1.18 - Stealth mode implemented
    * Mission sequences steal the money from target account
* v0.1.17.1 - Regex filter to webcrawler output
* v0.1.17 - Signature functionality added
* v0.1.16.2 - Mishchap issue fixed
* v0.1.16.1 - Webcrawler update
* v0.1.16 - Uploader and webcrawler joined
* v0.1.15.3 - Credits area added
* v0.1.15.2 - Mission sequences fixed
    * The bot was not loggin in bank accounts
* v0.1.15.1 - Monitor sequences update
* v0.1.15 - Mission monitor and logs monitor implemented
* v0.1.14.1 - Mission sequences update
* v0.1.13.2 - Uploader fixed
    * The bot was not ignoring the inexistent ips then it was always going through 1.2.3.4.
* v0.1.13.1 - Many bugs fixed
* v0.1.13 - Alert button added
* v0.1.12 - Webcrawler update
* v0.1.11 - Webcrawler update
* v0.1.10 - Webcrawler module implemented
* v0.1.9 - Core upgrade
    * Now bot runs over jSpaguetti API
* v0.1.8 - First stable version

## How to contribute
The bot is entirely written with [jSpaghetti](https://github.com/gresendesa/jSpaghetti) API. jSpaghetti provides a modular and declarative way to write scripts.
There are two ways to add new functionalities.
* Creating a new sequence into a existing module to related functionality; or
* Creating a module to build a new functionality.
