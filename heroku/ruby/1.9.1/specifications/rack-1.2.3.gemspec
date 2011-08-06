# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{rack}
  s.version = "1.2.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Christian Neukirchen"]
  s.date = %q{2011-05-23}
  s.default_executable = %q{rackup}
  s.description = %q{Rack provides minimal, modular and adaptable interface for developing
web applications in Ruby.  By wrapping HTTP requests and responses in
the simplest way possible, it unifies and distills the API for web
servers, web frameworks, and software in between (the so-called
middleware) into a single method call.

Also see http://rack.rubyforge.org.
}
  s.email = %q{chneukirchen@gmail.com}
  s.executables = ["rackup"]
  s.files = ["test/spec_auth_basic.rb", "test/spec_auth_digest.rb", "test/spec_builder.rb", "test/spec_cascade.rb", "test/spec_cgi.rb", "test/spec_chunked.rb", "test/spec_commonlogger.rb", "test/spec_conditionalget.rb", "test/spec_config.rb", "test/spec_content_length.rb", "test/spec_content_type.rb", "test/spec_deflater.rb", "test/spec_directory.rb", "test/spec_etag.rb", "test/spec_fastcgi.rb", "test/spec_file.rb", "test/spec_handler.rb", "test/spec_head.rb", "test/spec_lint.rb", "test/spec_lobster.rb", "test/spec_lock.rb", "test/spec_logger.rb", "test/spec_methodoverride.rb", "test/spec_mock.rb", "test/spec_mongrel.rb", "test/spec_nulllogger.rb", "test/spec_recursive.rb", "test/spec_request.rb", "test/spec_response.rb", "test/spec_rewindable_input.rb", "test/spec_runtime.rb", "test/spec_sendfile.rb", "test/spec_session_cookie.rb", "test/spec_session_memcache.rb", "test/spec_session_pool.rb", "test/spec_showexceptions.rb", "test/spec_showstatus.rb", "test/spec_static.rb", "test/spec_thin.rb", "test/spec_urlmap.rb", "test/spec_utils.rb", "test/spec_webrick.rb", "bin/rackup"]
  s.homepage = %q{http://rack.rubyforge.org}
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{rack}
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{a modular Ruby webserver interface}
  s.test_files = ["test/spec_auth_basic.rb", "test/spec_auth_digest.rb", "test/spec_builder.rb", "test/spec_cascade.rb", "test/spec_cgi.rb", "test/spec_chunked.rb", "test/spec_commonlogger.rb", "test/spec_conditionalget.rb", "test/spec_config.rb", "test/spec_content_length.rb", "test/spec_content_type.rb", "test/spec_deflater.rb", "test/spec_directory.rb", "test/spec_etag.rb", "test/spec_fastcgi.rb", "test/spec_file.rb", "test/spec_handler.rb", "test/spec_head.rb", "test/spec_lint.rb", "test/spec_lobster.rb", "test/spec_lock.rb", "test/spec_logger.rb", "test/spec_methodoverride.rb", "test/spec_mock.rb", "test/spec_mongrel.rb", "test/spec_nulllogger.rb", "test/spec_recursive.rb", "test/spec_request.rb", "test/spec_response.rb", "test/spec_rewindable_input.rb", "test/spec_runtime.rb", "test/spec_sendfile.rb", "test/spec_session_cookie.rb", "test/spec_session_memcache.rb", "test/spec_session_pool.rb", "test/spec_showexceptions.rb", "test/spec_showstatus.rb", "test/spec_static.rb", "test/spec_thin.rb", "test/spec_urlmap.rb", "test/spec_utils.rb", "test/spec_webrick.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bacon>, [">= 0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<fcgi>, [">= 0"])
      s.add_development_dependency(%q<memcache-client>, [">= 0"])
      s.add_development_dependency(%q<mongrel>, [">= 0"])
      s.add_development_dependency(%q<thin>, [">= 0"])
    else
      s.add_dependency(%q<bacon>, [">= 0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<fcgi>, [">= 0"])
      s.add_dependency(%q<memcache-client>, [">= 0"])
      s.add_dependency(%q<mongrel>, [">= 0"])
      s.add_dependency(%q<thin>, [">= 0"])
    end
  else
    s.add_dependency(%q<bacon>, [">= 0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<fcgi>, [">= 0"])
    s.add_dependency(%q<memcache-client>, [">= 0"])
    s.add_dependency(%q<mongrel>, [">= 0"])
    s.add_dependency(%q<thin>, [">= 0"])
  end
end
