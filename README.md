# Net-Uptime-Monitor README

## Overview
Net-Uptime-Monitor is a Telegram bot designed to monitor internet connectivity and notify group members about the status of the internet connection. This bot is particularly useful for teams who rely on a stable internet connection and need to be promptly informed about any downtime or restoration of service.

## Features
- **Internet Status Monitoring**: Regularly checks internet connectivity by attempting to access a reliable website (e.g., Google).
- **Telegram Group Integration**: Can be added to Telegram groups to provide updates about internet status.
- **Notification on Connectivity Changes**: Sends messages to the group when the internet goes down and comes back up, including downtime duration.
- **Auto-Removal Handling**: Detects when it's removed from a group and updates its group list accordingly.
- **Time Zone Support**: Configured for Tehran's timezone but can be adjusted as needed.

## Installation

1. **Clone the Repository**:
   ```
   git clone https://github.com/mostafa8026/net-uptime-monitor.git
   ```
2. **Navigate to the Project Directory**:
   ```
   cd net-uptime-monitor
   ```
3. **Install Dependencies**:
   ```
   npm install
   ```

## Configuration
- Create a `.env` file in the root directory.
- Add your Telegram bot token as `TELEGRAM_BOT_TOKEN`.
- Optionally, set the checking interval by adding `CHECK_INTERVAL` (in seconds).

## Usage

- **Starting the Bot**: 
  ```
  npm start
  ```
  or for development:
  ```
  npm run start:dev
  ```

- **Adding to a Group**: Simply add the bot to a Telegram group and send the `/start` command.

- **Checking Internet Status**: The bot automatically checks the internet status at regular intervals defined by `CHECK_INTERVAL`.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.