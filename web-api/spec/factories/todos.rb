FactoryBot.define do
  factory :todo do
    title { Faker::Lorem.word }
    user_id { Faker::Number.number(digits: 10) }
  end
end
