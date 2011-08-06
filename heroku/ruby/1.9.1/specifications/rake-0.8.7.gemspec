# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{rake}
  s.version = "0.8.7"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Jim Weirich"]
  s.date = %q{2009-05-15}
  s.default_executable = %q{rake}
  s.description = %q{Rake is a Make-like program implemented in Ruby. Tasks and dependencies are specified in standard Ruby syntax.}
  s.email = %q{jim@weirichhouse.org}
  s.executables = ["rake"]
  s.files = ["bin/rake"]
  s.homepage = %q{http://rake.rubyforge.org}
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{rake}
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{Ruby based make-like utility.}

  if s.respond_to? :specification_version then
    s.specification_version = 2

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
