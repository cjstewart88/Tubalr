# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{builder}
  s.version = "2.1.2"

  s.required_rubygems_version = nil if s.respond_to? :required_rubygems_version=
  s.authors = ["Jim Weirich"]
  s.autorequire = %q{builder}
  s.cert_chain = nil
  s.date = %q{2007-06-15}
  s.description = %q{Builder provides a number of builder objects that make creating structured data simple to do.  Currently the following builder objects are supported:  * XML Markup * XML Events}
  s.email = %q{jim@weirichhouse.org}
  s.files = ["test/test_xchar.rb", "test/testblankslate.rb", "test/testeventbuilder.rb", "test/testmarkupbuilder.rb"]
  s.homepage = %q{http://onestepback.org}
  s.require_paths = ["lib"]
  s.required_ruby_version = Gem::Requirement.new("> 0.0.0")
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{Builders for MarkUp.}
  s.test_files = ["test/test_xchar.rb", "test/testblankslate.rb", "test/testeventbuilder.rb", "test/testmarkupbuilder.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 1

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
