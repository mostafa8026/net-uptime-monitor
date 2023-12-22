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

## Service Definition and Usage

### Service Definition

To run Net-Uptime-Monitor as a service on a Linux system, you can use systemd. Here is an example of a systemd service file:

```ini
[Unit]
Description=Net Uptime Monitor Service
After=network.target

[Service]
Type=simple
User=mostafa
ExecStart=/usr/bin/node index.mjs
WorkingDirectory=/home/mostafa/projects/net-uptime-monitor
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

This service definition ensures that the Net-Uptime-Monitor bot starts automatically after the network is up. It runs under the user `mostafa`, executes the `index.mjs` file using Node.js, and will restart on failure. The service is set to be wanted by the `multi-user.target`, making it start at boot under normal multi-user conditions.

### Usage

1. **Create the Service File**: Save the above service definition to a file named `net-uptime-monitor.service` in the `/etc/systemd/system/` directory.

2. **Reload Systemd**: To make systemd aware of the new service, reload the systemd manager configuration:
   ```
   sudo systemctl daemon-reload
   ```

3. **Enable the Service**: To enable the Net-Uptime-Monitor service, so it starts on boot:
   ```
   sudo systemctl enable net-uptime-monitor
   ```

4. **Start the Service**: To start the service immediately:
   ```
   sudo systemctl start net-uptime-monitor
   ```

5. **Check Service Status**: To check the status of the service:
   ```
   sudo systemctl status net-uptime-monitor
   ```

6. **View Logs**: To view logs for troubleshooting, use:
   ```
   journalctl -u net-uptime-monitor
   ```

### Notes
- Ensure that the paths in `ExecStart` and `WorkingDirectory` correctly point to your Node.js executable and the project directory.
- The user specified in `User` should have the necessary permissions to run the bot and write to any required files or directories.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.