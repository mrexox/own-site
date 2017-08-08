use strict;
use warnings;
use Win32::Process;
use Win32;
use Encode qw/ encode decode /;
use File::chdir;

$CWD = "E:\\Valentin\\own-site";
my $react;
Win32::Process::Create($react,
                      'C:\Program Files\nodejs\npm.cmd',
                      'npm start',
                      0,
                      CREATE_NEW_CONSOLE,
                      $CWD) or
                        die &ErrorReport();
$CWD .= '\\server';
Win32::Process::Create(my $server,
                        'E:/Valentin/own-site/server/server.exe',
                        '',
                        0,
                        CREATE_NEW_CONSOLE,
                        $CWD) or
                          die "Smthng went wrong: $!";

print 'You now are having 2 consoles: one for server another for React app';

$server->Wait(INFINITE);

sub ErrorReport{
       #print decode('UTF-8', Win32::FormatMessage( Win32::GetLastError() ));
       print "Error code: ${Win32::GetLastError() }";
}
