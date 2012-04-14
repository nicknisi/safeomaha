use strict;
use 5.10.0;
use URI::Escape;

# https://developer.foursquare.com/overview/auth

my $client_id =     "MFHWM4ODQS5CMN5FQLP5JKTBYXLC50EZCUCL5Y3XBVQRFCIQ";
my $client_secret = "DRXK3KGJ3BYV5WRVQBXZFBSI0G3UZWWGYDP4BOJPUQWSBHUP";
my $callback_url =  "http://localhost:8000";
my $cu = uri_escape($callback_url);

say "https://foursquare.com/oauth2/authenticate?client_id=$client_id\&response_type=code\&redirect_uri=$cu";
say "";

# Result:
# http://localhost:8000/?code=5GOK0XN5ZBEYIBQZOGNPQB4XSL02WXJGQV22SSHGNUL1VTIJ
my $code = "5GOK0XN5ZBEYIBQZOGNPQB4XSL02WXJGQV22SSHGNUL1VTIJ";

# Next request:
say "https://foursquare.com/oauth2/access_token?client_id=$client_id\&client_secret=$client_secret\&grant_type=authorization_code\&redirect_uri=$cu\&code=$code";
say "";

# Result:
# {"access_token":"FCVCMOMRD3HPS5HWCYEPEMVLT230VTXIRQX2BTARWCDZPUK1"}
my $access_token = "FCVCMOMRD3HPS5HWCYEPEMVLT230VTXIRQX2BTARWCDZPUK1";

# Request:
say "curl https://api.foursquare.com/v2/users/self/checkins?oauth_token=$access_token";


