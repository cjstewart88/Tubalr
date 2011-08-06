# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{tzinfo}
  s.version = "0.3.29"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Philip Ross"]
  s.date = %q{2011-06-26}
  s.description = %q{TZInfo is a Ruby library that uses the standard tz (Olson) database to provide daylight savings aware transformations between times in different time zones.}
  s.email = %q{phil.ross@gmail.com}
  s.files = ["test/tc_timezone.rb", "test/ts_all.rb", "test/tc_timezone_index_definition.rb", "test/tc_timezone_proxy.rb", "test/tc_linked_timezone_info.rb", "test/tc_timezone_period.rb", "test/tc_data_timezone_info.rb", "test/tc_timezone_melbourne.rb", "test/tc_country_index_definition.rb", "test/tc_offset_rationals.rb", "test/tc_timezone_definition.rb", "test/tc_timezone_london.rb", "test/tc_country.rb", "test/tc_timezone_utc.rb", "test/tc_info_timezone.rb", "test/tc_timezone_info.rb", "test/tc_timezone_new_york.rb", "test/test_utils.rb", "test/tc_time_or_datetime.rb", "test/tc_timezone_offset_info.rb", "test/tc_country_timezone.rb", "test/tc_country_info.rb", "test/tc_timezone_transition_info.rb", "test/tc_linked_timezone.rb", "test/tc_data_timezone.rb", "test/tc_ruby_core_support.rb"]
  s.homepage = %q{http://tzinfo.rubyforge.org/}
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{tzinfo}
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{Daylight-savings aware timezone library}
  s.test_files = ["test/tc_timezone.rb", "test/ts_all.rb", "test/tc_timezone_index_definition.rb", "test/tc_timezone_proxy.rb", "test/tc_linked_timezone_info.rb", "test/tc_timezone_period.rb", "test/tc_data_timezone_info.rb", "test/tc_timezone_melbourne.rb", "test/tc_country_index_definition.rb", "test/tc_offset_rationals.rb", "test/tc_timezone_definition.rb", "test/tc_timezone_london.rb", "test/tc_country.rb", "test/tc_timezone_utc.rb", "test/tc_info_timezone.rb", "test/tc_timezone_info.rb", "test/tc_timezone_new_york.rb", "test/test_utils.rb", "test/tc_time_or_datetime.rb", "test/tc_timezone_offset_info.rb", "test/tc_country_timezone.rb", "test/tc_country_info.rb", "test/tc_timezone_transition_info.rb", "test/tc_linked_timezone.rb", "test/tc_data_timezone.rb", "test/tc_ruby_core_support.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
