package SafeOmaha::Controller::Root;
use Moose;
use namespace::autoclean;
use JSON::XS;

BEGIN { extends 'Catalyst::Controller' }

my $file = "../../foursquare/example_checkins.json";
open my $in, '<', $file or die "Can't open '$file'";
local $/;
my $json = decode_json(<$in>);

#
# Sets the actions in this controller to be registered with no prefix
# so they function identically to actions created in MyApp.pm
#
__PACKAGE__->config(namespace => '');

=head1 NAME

SafeOmaha::Controller::Root - Root Controller for SafeOmaha

=head1 DESCRIPTION

[enter your description here]

=head1 METHODS

=head2 index

The root page (/)

=cut

sub index :Path :Args(0) {
   my ( $self, $c ) = @_;
   $c->stash->{foursquare}->{checkins} = $json;
}

=head2 default

Standard 404 error page

=cut

sub default :Path {
    my ( $self, $c ) = @_;
    $c->response->body( 'Page not found' );
    $c->response->status(404);
}

=head2 end

Attempt to render a view, if needed.

=cut

sub end : ActionClass('RenderView') {}


__PACKAGE__->meta->make_immutable;

1;
