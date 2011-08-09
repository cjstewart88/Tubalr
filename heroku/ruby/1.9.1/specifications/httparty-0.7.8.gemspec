# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{httparty}
  s.version = "0.7.8"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["John Nunemaker", "Sandro Turriate"]
  s.date = %q{2011-06-07}
  s.default_executable = %q{httparty}
  s.description = %q{Makes http fun! Also, makes consuming restful web services dead easy.}
  s.email = ["nunemaker@gmail.com"]
  s.executables = ["httparty"]
  s.files = ["features/basic_authentication.feature", "features/command_line.feature", "features/deals_with_http_error_codes.feature", "features/digest_authentication.feature", "features/handles_compressed_responses.feature", "features/handles_multiple_formats.feature", "features/steps/env.rb", "features/steps/httparty_response_steps.rb", "features/steps/httparty_steps.rb", "features/steps/mongrel_helper.rb", "features/steps/remote_service_steps.rb", "features/supports_redirection.feature", "features/supports_timeout_option.feature", "spec/fixtures/delicious.xml", "spec/fixtures/empty.xml", "spec/fixtures/google.html", "spec/fixtures/ssl/generate.sh", "spec/fixtures/ssl/generated/1fe462c2.0", "spec/fixtures/ssl/generated/bogushost.crt", "spec/fixtures/ssl/generated/ca.crt", "spec/fixtures/ssl/generated/ca.key", "spec/fixtures/ssl/generated/selfsigned.crt", "spec/fixtures/ssl/generated/server.crt", "spec/fixtures/ssl/generated/server.key", "spec/fixtures/ssl/openssl-exts.cnf", "spec/fixtures/twitter.json", "spec/fixtures/twitter.xml", "spec/fixtures/undefined_method_add_node_for_nil.xml", "spec/httparty/cookie_hash_spec.rb", "spec/httparty/net_digest_auth_spec.rb", "spec/httparty/parser_spec.rb", "spec/httparty/request_spec.rb", "spec/httparty/response_spec.rb", "spec/httparty/ssl_spec.rb", "spec/httparty_spec.rb", "spec/spec.opts", "spec/spec_helper.rb", "spec/support/ssl_test_helper.rb", "spec/support/ssl_test_server.rb", "spec/support/stub_response.rb", "bin/httparty"]
  s.homepage = %q{http://httparty.rubyforge.org/}
  s.post_install_message = %q{When you HTTParty, you must party hard!}
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{Makes http fun! Also, makes consuming restful web services dead easy.}
  s.test_files = ["features/basic_authentication.feature", "features/command_line.feature", "features/deals_with_http_error_codes.feature", "features/digest_authentication.feature", "features/handles_compressed_responses.feature", "features/handles_multiple_formats.feature", "features/steps/env.rb", "features/steps/httparty_response_steps.rb", "features/steps/httparty_steps.rb", "features/steps/mongrel_helper.rb", "features/steps/remote_service_steps.rb", "features/supports_redirection.feature", "features/supports_timeout_option.feature", "spec/fixtures/delicious.xml", "spec/fixtures/empty.xml", "spec/fixtures/google.html", "spec/fixtures/ssl/generate.sh", "spec/fixtures/ssl/generated/1fe462c2.0", "spec/fixtures/ssl/generated/bogushost.crt", "spec/fixtures/ssl/generated/ca.crt", "spec/fixtures/ssl/generated/ca.key", "spec/fixtures/ssl/generated/selfsigned.crt", "spec/fixtures/ssl/generated/server.crt", "spec/fixtures/ssl/generated/server.key", "spec/fixtures/ssl/openssl-exts.cnf", "spec/fixtures/twitter.json", "spec/fixtures/twitter.xml", "spec/fixtures/undefined_method_add_node_for_nil.xml", "spec/httparty/cookie_hash_spec.rb", "spec/httparty/net_digest_auth_spec.rb", "spec/httparty/parser_spec.rb", "spec/httparty/request_spec.rb", "spec/httparty/response_spec.rb", "spec/httparty/ssl_spec.rb", "spec/httparty_spec.rb", "spec/spec.opts", "spec/spec_helper.rb", "spec/support/ssl_test_helper.rb", "spec/support/ssl_test_server.rb", "spec/support/stub_response.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<crack>, ["= 0.1.8"])
      s.add_development_dependency(%q<activesupport>, ["~> 2.3"])
      s.add_development_dependency(%q<cucumber>, ["~> 0.7"])
      s.add_development_dependency(%q<fakeweb>, ["~> 1.2"])
      s.add_development_dependency(%q<rspec>, ["~> 1.3"])
      s.add_development_dependency(%q<mongrel>, ["= 1.2.0.pre2"])
    else
      s.add_dependency(%q<crack>, ["= 0.1.8"])
      s.add_dependency(%q<activesupport>, ["~> 2.3"])
      s.add_dependency(%q<cucumber>, ["~> 0.7"])
      s.add_dependency(%q<fakeweb>, ["~> 1.2"])
      s.add_dependency(%q<rspec>, ["~> 1.3"])
      s.add_dependency(%q<mongrel>, ["= 1.2.0.pre2"])
    end
  else
    s.add_dependency(%q<crack>, ["= 0.1.8"])
    s.add_dependency(%q<activesupport>, ["~> 2.3"])
    s.add_dependency(%q<cucumber>, ["~> 0.7"])
    s.add_dependency(%q<fakeweb>, ["~> 1.2"])
    s.add_dependency(%q<rspec>, ["~> 1.3"])
    s.add_dependency(%q<mongrel>, ["= 1.2.0.pre2"])
  end
end
