# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{erubis}
  s.version = "2.6.6"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["makoto kuwata"]
  s.date = %q{2010-06-26}
  s.default_executable = %q{erubis}
  s.description = %q{  Erubis is an implementation of eRuby and has the following features:

  * Very fast, almost three times faster than ERB and about 10% faster than eruby.
  * Multi-language support (Ruby/PHP/C/Java/Scheme/Perl/Javascript)
  * Auto escaping support
  * Auto trimming spaces around '<% %>'
  * Embedded pattern changeable (default '<% %>')
  * Enable to handle Processing Instructions (PI) as embedded pattern (ex. '<?rb ... ?>')
  * Context object available and easy to combine eRuby template with YAML datafile
  * Print statement available
  * Easy to extend and customize in subclass
  * Ruby on Rails support
}
  s.email = %q{kwa(at)kuwata-lab.com}
  s.executables = ["erubis"]
  s.files = ["test/test.rb", "bin/erubis"]
  s.homepage = %q{http://www.kuwata-lab.com/erubis/}
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{erubis}
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{a fast and extensible eRuby implementation which supports multi-language}
  s.test_files = ["test/test.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<abstract>, [">= 1.0.0"])
    else
      s.add_dependency(%q<abstract>, [">= 1.0.0"])
    end
  else
    s.add_dependency(%q<abstract>, [">= 1.0.0"])
  end
end
