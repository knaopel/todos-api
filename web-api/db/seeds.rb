# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
if User.count > 0
  50.times do
    todo = Todo.create(title: Faker::Lorem.sentence, body: Faker::Lorem.paragraph , user_id: User.first.id)
    todo.items.create(name: Faker::Lorem.sentence, done: false)
  end
end
