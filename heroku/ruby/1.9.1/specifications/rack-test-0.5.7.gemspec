# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{rack-test}
  s.version = "0.5.7"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Bryan Helmkamp"]
  s.date = %q{2011-01-01}
  s.description = %q{Rack::Test is a small, simple testing API for Rack apps. It can be used on its
own or as a reusable starting point for Web frameworks and testing libraries
to build on. Most of its initial functionality is an extraction of Merb 1.0's
request helpers feature.}
  s.email = %q{bryan@brynary.com}
  s.files = ["spec/fixtures/fake_app.rb", "spec/rack/test/cookie_spec.rb", "spec/rack/test/digest_auth_spec.rb", "spec/rack/test/multipart_spec.rb", "spec/rack/test/utils_spec.rb", "spec/rack/test_spec.rb", "spec/spec_helper.rb", "spec/support/matchers/body.rb", "spec/support/matchers/challenge.rb"]
  s.homepage = %q{http://github.com/brynary/rack-test}
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{rack-test}
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{Simple testing API built on Rack}
  s.test_files = ["spec/fixtures/fake_app.rb", "spec/rack/test/cookie_spec.rb", "spec/rack/test/digest_auth_spec.rb", "spec/rack/test/multipart_spec.rb", "spec/rack/test/utils_spec.rb", "spec/rack/test_spec.rb", "spec/spec_helper.rb", "spec/support/matchers/body.rb", "spec/support/matchers/challenge.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rack>, [">= 1.0"])
    else
      s.add_dependency(%q<rack>, [">= 1.0"])
    end
  else
    s.add_dependency(%q<rack>, [">= 1.0"])
  end
end
