class User < ApplicationRecord
  include Followable
  include Honeyable
  # encrypt password
  has_secure_password

  def first_name
    full_name.split.first
  end

  # Model associations
  has_many :todos, foreign_key: :created_by

  # Validations
  validates_presence_of :name, :email, :password_digest
  validates :username, presence: true,
    format: { with: /\A(?=.*[a-z])[a-z\d]+\Z/i },
    uniqueness: { case_sensitive: false }
end