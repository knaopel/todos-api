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
  validates_presence_of :name, :password_digest
  validates :email, presence: true,
    format: { with: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i },
    uniqueness: { case_sensitive: false }
end