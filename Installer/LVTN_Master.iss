; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "Webserver Application"
#define MyAppVersion "2.3"
#define MyAppPublisher "Nguyen Minh Thai - 1910526"
#define MyAppURL "http://50.50.50.100:3000/"

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{CB2D68FA-F9DC-4F89-8EF1-DEE0399CC9AE}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName=C:\Webserver Application\SCADA Master
DefaultGroupName={#MyAppName}
; Uncomment the following line to run in non administrative install mode (install for current user only.)
;PrivilegesRequired=lowest
OutputDir=C:\Users\minht\OneDrive\Documents\Subjects\LVTN\LVTN\Installer
OutputBaseFilename=setupMaster
SetupIconFile=C:\Users\minht\OneDrive\Documents\Subjects\LVTN\LVTN\Server Application\resources\app\icon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "C:\Users\minht\OneDrive\Documents\Subjects\LVTN\LVTN\Server Application\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files
[Run]
Filename: "{app}\Server\node-v20.9.0-x64.msi"; Description: "Installing Node.js"; Flags: postinstall shellexec waituntilterminated
[Icons]
Name: "{commondesktop}\\{#MyAppName}"; Filename: "C:\Webserver Application\SCADA Master\server.bat"; WorkingDir: "C:\Webserver Application\SCADA Master"; IconFilename: "{app}\resources\app\icon.ico"; Comment: "Start {#MyAppName}"
