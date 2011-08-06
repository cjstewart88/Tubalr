# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{actionmailer}
  s.version = "3.0.9"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["David Heinemeier Hansson"]
  s.date = %q{2011-06-16}
  s.description = %q{Email on Rails. Compose, deliver, receive, and test emails using the familiar controller/view pattern. First-class support for multipart email and attachments.}
  s.email = %q{david@loudthinking.com}
  s.homepage = %q{http://www.rubyonrails.org}
  s.require_paths = ["lib"]
  s.required_ruby_version = Gem::Requirement.new(">= 1.8.7")
  s.requirements = ["none"]
  s.rubyforge_project = %q{actionmailer}
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{Email composition, delivery, and receiving framework (part of Rails).}

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<actionpack>, ["= 3.0.9"])
      s.add_runtime_dependency(%q<mail>, ["~> 2.2.19"])
    else
      s.add_dependency(%q<actionpack>, ["= 3.0.9"])
      s.add_dependency(%q<mail>, ["~> 2.2.19"])
    end
  else
    s.add_dependency(%q<actionpack>, ["= 3.0.9"])
    s.add_dependency(%q<mail>, ["~> 2.2.19"])
  end
end
