package SafeOmaha::Controller::Root;
use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller' }

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

sub add_points_js :Private {
   my ($self, $c) = @_;
   $c->log->debug("HI!");
   my $points_js = <<EOT;
      for (var i = 0; i < 10; i++) {
         var point = new GLatLng(southWest.lat() + latSpan * Math.random(),
                                 southWest.lng() + lngSpan * Math.random());
          map.addOverlay(new GMarker(point));
        }
EOT
}



=head1 AUTHOR

Jay Hannah,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
