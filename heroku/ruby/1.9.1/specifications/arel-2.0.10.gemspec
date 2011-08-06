# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{arel}
  s.version = "2.0.10"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Aaron Patterson", "Bryan Halmkamp", "Emilio Tagua", "Nick Kallen"]
  s.date = %q{2011-05-17}
  s.description = %q{Arel is a Relational Algebra for Ruby. It 1) simplifies the generation complex of SQL queries and it 2) adapts to various RDBMS systems. It is intended to be a framework framework; that is, you can build your own ORM with it, focusing on innovative object and collection modeling as opposed to database compatibility and query generation.}
  s.email = ["aaron@tenderlovemaking.com", "bryan@brynary.com", "miloops@gmail.com", "nick@example.org"]
  s.files = ["test/attributes/test_attribute.rb", "test/nodes/test_as.rb", "test/nodes/test_count.rb", "test/nodes/test_delete_statement.rb", "test/nodes/test_equality.rb", "test/nodes/test_insert_statement.rb", "test/nodes/test_node.rb", "test/nodes/test_not.rb", "test/nodes/test_or.rb", "test/nodes/test_select_core.rb", "test/nodes/test_select_statement.rb", "test/nodes/test_sql_literal.rb", "test/nodes/test_sum.rb", "test/nodes/test_update_statement.rb", "test/test_activerecord_compat.rb", "test/test_attributes.rb", "test/test_crud.rb", "test/test_delete_manager.rb", "test/test_insert_manager.rb", "test/test_select_manager.rb", "test/test_table.rb", "test/test_update_manager.rb", "test/visitors/test_depth_first.rb", "test/visitors/test_dot.rb", "test/visitors/test_join_sql.rb", "test/visitors/test_mssql.rb", "test/visitors/test_mysql.rb", "test/visitors/test_oracle.rb", "test/visitors/test_postgres.rb", "test/visitors/test_sqlite.rb", "test/visitors/test_to_sql.rb"]
  s.homepage = %q{http://github.com/rails/arel}
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{arel}
  s.rubygems_version = %q{1.6.1}
  s.summary = %q{Arel is a Relational Algebra for Ruby}
  s.test_files = ["test/attributes/test_attribute.rb", "test/nodes/test_as.rb", "test/nodes/test_count.rb", "test/nodes/test_delete_statement.rb", "test/nodes/test_equality.rb", "test/nodes/test_insert_statement.rb", "test/nodes/test_node.rb", "test/nodes/test_not.rb", "test/nodes/test_or.rb", "test/nodes/test_select_core.rb", "test/nodes/test_select_statement.rb", "test/nodes/test_sql_literal.rb", "test/nodes/test_sum.rb", "test/nodes/test_update_statement.rb", "test/test_activerecord_compat.rb", "test/test_attributes.rb", "test/test_crud.rb", "test/test_delete_manager.rb", "test/test_insert_manager.rb", "test/test_select_manager.rb", "test/test_table.rb", "test/test_update_manager.rb", "test/visitors/test_depth_first.rb", "test/visitors/test_dot.rb", "test/visitors/test_join_sql.rb", "test/visitors/test_mssql.rb", "test/visitors/test_mysql.rb", "test/visitors/test_oracle.rb", "test/visitors/test_postgres.rb", "test/visitors/test_sqlite.rb", "test/visitors/test_to_sql.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<minitest>, [">= 2.0.2"])
      s.add_development_dependency(%q<hoe>, [">= 2.1.0"])
      s.add_development_dependency(%q<minitest>, [">= 1.6.0"])
      s.add_development_dependency(%q<hoe>, [">= 2.9.1"])
    else
      s.add_dependency(%q<minitest>, [">= 2.0.2"])
      s.add_dependency(%q<hoe>, [">= 2.1.0"])
      s.add_dependency(%q<minitest>, [">= 1.6.0"])
      s.add_dependency(%q<hoe>, [">= 2.9.1"])
    end
  else
    s.add_dependency(%q<minitest>, [">= 2.0.2"])
    s.add_dependency(%q<hoe>, [">= 2.1.0"])
    s.add_dependency(%q<minitest>, [">= 1.6.0"])
    s.add_dependency(%q<hoe>, [">= 2.9.1"])
  end
end
