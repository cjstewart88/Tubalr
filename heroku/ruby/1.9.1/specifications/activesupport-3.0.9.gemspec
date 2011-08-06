# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{activesupport}
  s.version = "3.0.9"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["David Heinemeier Hansson"]
  s.date = %q{2011-06-16}
  s.description = %q{A toolkit of support libraries and Ruby core extensions extracted from the Rails framework. Rich support for multibyte strings, internationalization, time zones, and testing.}
  s.email = %q{david@loudthinking.com}
  s.homepage = %q{http://www.rubyonrails.org}
  s.require_paths = ["lib"]
  s.required_ruby_version = Gem::Requirement.new(">= 1.8.7")
  s.rubyforge_project = %q{activesupport}
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{A toolkit of support libraries and Ruby core extensions extracted from the Rails framework.}

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
