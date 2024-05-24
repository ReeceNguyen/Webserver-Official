rem path to mysql server bin folder
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"

rem credentials to connect to mysql server
set mysql_user=admin
set mysql_password=123

rem Get current timestamp
set datetime=%date:~10,4%-%date:~4,2%-%date:~7,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%

rem Backup path
set backup_path=C:\Webserver Application\SCADA Master\BackupDB\DB

rem Backup file name with timestamp
set backup_name=my-databases

rem Backup command
mysqldump --user=%mysql_user% --password=%mysql_password% --all-databases --routines --events --result-file="%backup_path%\%backup_name%_%datetime%.sql"

if %ERRORLEVEL% neq 0 (
  (echo Backup failed: error during dump creation) >> "%backup_path%\mysql_backup_log.txt"
) else (echo Backup successful) >> "%backup_path%\mysql_backup_log.txt"
