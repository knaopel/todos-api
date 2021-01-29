require 'rails_helper'

RSpec.describe User, type: :model do
  # Association test
  # ensure User model has m:1 relationship with the Todo model
  it { should have_many(:todos) }

  # Validation Tests
  # ensure name, email and password_digest are present before save
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
end
