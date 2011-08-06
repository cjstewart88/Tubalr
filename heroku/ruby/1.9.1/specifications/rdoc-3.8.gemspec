# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{rdoc}
  s.version = "3.8"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3") if s.respond_to? :required_rubygems_version=
  s.authors = ["Eric Hodel", "Dave Thomas", "Phil Hagelberg", "Tony Strauss"]
  s.cert_chain = ["-----BEGIN CERTIFICATE-----\nMIIDNjCCAh6gAwIBAgIBADANBgkqhkiG9w0BAQUFADBBMRAwDgYDVQQDDAdkcmJy\nYWluMRgwFgYKCZImiZPyLGQBGRYIc2VnbWVudDcxEzARBgoJkiaJk/IsZAEZFgNu\nZXQwHhcNMDcxMjIxMDIwNDE0WhcNMDgxMjIwMDIwNDE0WjBBMRAwDgYDVQQDDAdk\ncmJyYWluMRgwFgYKCZImiZPyLGQBGRYIc2VnbWVudDcxEzARBgoJkiaJk/IsZAEZ\nFgNuZXQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCbbgLrGLGIDE76\nLV/cvxdEzCuYuS3oG9PrSZnuDweySUfdp/so0cDq+j8bqy6OzZSw07gdjwFMSd6J\nU5ddZCVywn5nnAQ+Ui7jMW54CYt5/H6f2US6U0hQOjJR6cpfiymgxGdfyTiVcvTm\nGj/okWrQl0NjYOYBpDi+9PPmaH2RmLJu0dB/NylsDnW5j6yN1BEI8MfJRR+HRKZY\nmUtgzBwF1V4KIZQ8EuL6I/nHVu07i6IkrpAgxpXUfdJQJi0oZAqXurAV3yTxkFwd\ng62YrrW26mDe+pZBzR6bpLE+PmXCzz7UxUq3AE0gPHbiMXie3EFE0oxnsU3lIduh\nsCANiQ8BAgMBAAGjOTA3MAkGA1UdEwQCMAAwCwYDVR0PBAQDAgSwMB0GA1UdDgQW\nBBS5k4Z75VSpdM0AclG2UvzFA/VW5DANBgkqhkiG9w0BAQUFAAOCAQEAHagT4lfX\nkP/hDaiwGct7XPuVGbrOsKRVD59FF5kETBxEc9UQ1clKWngf8JoVuEoKD774dW19\nbU0GOVWO+J6FMmT/Cp7nuFJ79egMf/gy4gfUfQMuvfcr6DvZUPIs9P/TlK59iMYF\nDIOQ3DxdF3rMzztNUCizN4taVscEsjCcgW6WkUJnGdqlu3OHWpQxZBJkBTjPCoc6\nUW6on70SFPmAy/5Cq0OJNGEWBfgD9q7rrs/X8GGwUWqXb85RXnUVi/P8Up75E0ag\n14jEc90kN+C7oI/AGCBN0j6JnEtYIEJZibjjDJTSMWlUKKkj30kq7hlUC2CepJ4v\nx52qPcexcYZR7w==\n-----END CERTIFICATE-----\n"]
  s.date = %q{2011-06-29}
  s.description = %q{RDoc produces HTML and command-line documentation for Ruby projects.  RDoc
includes the +rdoc+ and +ri+ tools for generating and displaying online
documentation.

See RDoc for a description of RDoc's markup and basic use.}
  s.email = ["drbrain@segment7.net", "", "technomancy@gmail.com", "tony.strauss@designingpatterns.com"]
  s.executables = ["rdoc", "ri"]
  s.files = ["test/test_attribute_manager.rb", "test/test_rdoc_alias.rb", "test/test_rdoc_any_method.rb", "test/test_rdoc_attr.rb", "test/test_rdoc_class_module.rb", "test/test_rdoc_code_object.rb", "test/test_rdoc_constant.rb", "test/test_rdoc_context.rb", "test/test_rdoc_context_section.rb", "test/test_rdoc_encoding.rb", "test/test_rdoc_generator_darkfish.rb", "test/test_rdoc_generator_ri.rb", "test/test_rdoc_include.rb", "test/test_rdoc_markup.rb", "test/test_rdoc_markup_attribute_manager.rb", "test/test_rdoc_markup_document.rb", "test/test_rdoc_markup_indented_paragraph.rb", "test/test_rdoc_markup_paragraph.rb", "test/test_rdoc_markup_parser.rb", "test/test_rdoc_markup_pre_process.rb", "test/test_rdoc_markup_raw.rb", "test/test_rdoc_markup_to_ansi.rb", "test/test_rdoc_markup_to_bs.rb", "test/test_rdoc_markup_to_html.rb", "test/test_rdoc_markup_to_html_crossref.rb", "test/test_rdoc_markup_to_rdoc.rb", "test/test_rdoc_markup_to_tt_only.rb", "test/test_rdoc_method_attr.rb", "test/test_rdoc_normal_class.rb", "test/test_rdoc_normal_module.rb", "test/test_rdoc_options.rb", "test/test_rdoc_parser.rb", "test/test_rdoc_parser_c.rb", "test/test_rdoc_parser_ruby.rb", "test/test_rdoc_parser_simple.rb", "test/test_rdoc_rdoc.rb", "test/test_rdoc_require.rb", "test/test_rdoc_ri_driver.rb", "test/test_rdoc_ri_paths.rb", "test/test_rdoc_ri_store.rb", "test/test_rdoc_ruby_lex.rb", "test/test_rdoc_rubygems_hook.rb", "test/test_rdoc_single_class.rb", "test/test_rdoc_stats.rb", "test/test_rdoc_task.rb", "test/test_rdoc_text.rb", "test/test_rdoc_top_level.rb", "bin/rdoc", "bin/ri"]
  s.homepage = %q{http://docs.seattlerb.org/rdoc}
  s.require_paths = ["lib"]
  s.required_ruby_version = Gem::Requirement.new(">= 1.8.7")
  s.rubyforge_project = %q{rdoc}
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{RDoc produces HTML and command-line documentation for Ruby projects}
  s.test_files = ["test/test_attribute_manager.rb", "test/test_rdoc_alias.rb", "test/test_rdoc_any_method.rb", "test/test_rdoc_attr.rb", "test/test_rdoc_class_module.rb", "test/test_rdoc_code_object.rb", "test/test_rdoc_constant.rb", "test/test_rdoc_context.rb", "test/test_rdoc_context_section.rb", "test/test_rdoc_encoding.rb", "test/test_rdoc_generator_darkfish.rb", "test/test_rdoc_generator_ri.rb", "test/test_rdoc_include.rb", "test/test_rdoc_markup.rb", "test/test_rdoc_markup_attribute_manager.rb", "test/test_rdoc_markup_document.rb", "test/test_rdoc_markup_indented_paragraph.rb", "test/test_rdoc_markup_paragraph.rb", "test/test_rdoc_markup_parser.rb", "test/test_rdoc_markup_pre_process.rb", "test/test_rdoc_markup_raw.rb", "test/test_rdoc_markup_to_ansi.rb", "test/test_rdoc_markup_to_bs.rb", "test/test_rdoc_markup_to_html.rb", "test/test_rdoc_markup_to_html_crossref.rb", "test/test_rdoc_markup_to_rdoc.rb", "test/test_rdoc_markup_to_tt_only.rb", "test/test_rdoc_method_attr.rb", "test/test_rdoc_normal_class.rb", "test/test_rdoc_normal_module.rb", "test/test_rdoc_options.rb", "test/test_rdoc_parser.rb", "test/test_rdoc_parser_c.rb", "test/test_rdoc_parser_ruby.rb", "test/test_rdoc_parser_simple.rb", "test/test_rdoc_rdoc.rb", "test/test_rdoc_require.rb", "test/test_rdoc_ri_driver.rb", "test/test_rdoc_ri_paths.rb", "test/test_rdoc_ri_store.rb", "test/test_rdoc_ruby_lex.rb", "test/test_rdoc_rubygems_hook.rb", "test/test_rdoc_single_class.rb", "test/test_rdoc_stats.rb", "test/test_rdoc_task.rb", "test/test_rdoc_text.rb", "test/test_rdoc_top_level.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<minitest>, [">= 2.3.1"])
      s.add_development_dependency(%q<minitest>, ["~> 2"])
      s.add_development_dependency(%q<isolate>, ["~> 3"])
      s.add_development_dependency(%q<ZenTest>, ["~> 4"])
      s.add_development_dependency(%q<hoe>, ["~> 2.9"])
    else
      s.add_dependency(%q<minitest>, [">= 2.3.1"])
      s.add_dependency(%q<minitest>, ["~> 2"])
      s.add_dependency(%q<isolate>, ["~> 3"])
      s.add_dependency(%q<ZenTest>, ["~> 4"])
      s.add_dependency(%q<hoe>, ["~> 2.9"])
    end
  else
    s.add_dependency(%q<minitest>, [">= 2.3.1"])
    s.add_dependency(%q<minitest>, ["~> 2"])
    s.add_dependency(%q<isolate>, ["~> 3"])
    s.add_dependency(%q<ZenTest>, ["~> 4"])
    s.add_dependency(%q<hoe>, ["~> 2.9"])
  end
end
