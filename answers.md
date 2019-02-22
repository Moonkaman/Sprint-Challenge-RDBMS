1. Explain the difference between RDBMS and SQL.

- A RDBMS is a Relational Database Management System and SQL is Structured Query Language so the RDBMS is used
  for managing the actual database and the SQL is the language you use to tell the RDBMS what you want to do like select, update, insert etc.

2. Why do tables need a primary key?

- Tables need a primary key so each row or piece of data has a unique key that can be used to reference that row
  or piece of data. Without it, it would be harder to find the exact piece of data you want, for example in a list of names without a unique id if you wanted to select by name there could be multiple of the same name and you wouldn't get the result you want, so that's why we have primary keys.

3. What is the name given to a table column that references the primary key on another table.

- That would be a foreign key, it is used exactly as described in the question. To refer to the primary key
  of another table.

4. What do we need in order to have a many to many relationship between two tables.

- In order to have a many to many relationship between two tables we need a third one that holds the many to many
  columns, for example with the student cohort example we have been using all week, a student can have multiple cohorts and cohorts can have multiple students so we set up a third table that has two columns, one for the student id and one for the cohort id.
