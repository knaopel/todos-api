# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
50.times do
  todo = Todo.create(title: Faker::Lorem.word, user_id: User.first.id)
  todo.items.create(name: Faker::Lorem.word, done: false)
end

Author.find_or_create_by(name: 'Cory House')
Author.find_or_create_by(name: 'Kurt Opel')
Author.find_or_create_by(name: 'Dan Whalin')

Course.find_or_create_by(title: "Securing React Apps with Auth0") do |course|
  course.slug = "react-auth0-authentication-security"
  course.author_id = 1
  course.category = "JavaScript"
end

Course.find_or_create_by(title: "React: The Big Picture") do |course|
  course.slug = "react-big-picture"
  course.author_id = 1
  course.category = "JavaScript"
end
Course.find_or_create_by(title: "Creating Reusable React Components") do |course|
  course.slug = "react-creating-reusable-components"
  course.author_id = 1
  course.category = "JavaScript"
end
Course.find_or_create_by(title: "Building a JavaScript Development Environment") do |course|
  course.slug = "javascript-development-environment"
  course.author_id = 1
  course.category = "JavaScript"
end

Course.find_or_create_by(title: "Building Applications with React and Redux") do |course|
  course.slug = "react-redux-react-router-es6"
  course.author_id = 1
  course.category = "JavaScript"
end

Course.find_or_create_by(title: "Building Applications in React and Flux") do |course|
  course.slug = "react-flux-building-applications"
  course.author_id = 1
  course.category = "JavaScript"
end

Course.find_or_create_by(title: "Clean Code: Writing Code for Humans") do |course|
  course.slug = "writing-clean-code-humans"
  course.author_id = 1
  course.category = "Software Practices"
end

Course.find_or_create_by(title: "Architecting Applications for the Real World") do |course|
  course.slug = "architecting-applications-dotnet"
  course.author_id = 1
  course.category = "Software Architecture"
end

Course.find_or_create_by(title: "Becoming an Outlier: Reprogramming the Developer Mind") do |course|
  course.slug = "career-reboot-for-developer-mind"
  course.author_id = 1
  course.category = "Career"
end

Course.find_or_create_by(title: "Web Component Fundamentals") do |course|
  course.slug = "web-components-shadow-dom"
  course.author_id = 1
  course.category = "HTML5"
end
