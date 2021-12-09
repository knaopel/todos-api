require 'rails_helper'

RSpec.describe User, type: :model do
  # Association test
  # ensure User model has m:1 relationship with the Todo model
  it { should have_many(:todos) }

  # Validation Tests
  # ensure name, email and password_digest are present before save
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should have_secure_password }
  it { should validate_presence_of(:password_digest) }

  describe 'email validations' do
    subject { User.new(name: "foo", password_digest: "foo") }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should_not allow_value('foo.us', 'foo', 'foo@email', '@email.com').for(:email) }
    it { should allow_value('foo@foo.us', 'foo.bar@email.com', 'foo@email.subdomain.jp').for(:email) }
  end
end
