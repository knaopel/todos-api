class User < ApplicationRecord
  include Followable
  # encrypt password
  has_secure_password

  def first_name
    full_name.split.first
  end

  # Model associations
  # has_many :todos, foreign_key: :created_by
  # has_many :user_honey_assignments, :class_name => "Honey", :foreign_key => "user_id"
  # has_many :honeys, :through => :user_honey_assignments
  # has_many :honey_user_assignments, :class_name => "Honey", :foreign_key => "honey_id"
  # has_many :users, :through => :honey_user_assignments
  # Validations
  validates_presence_of :name, :email, :password_digest
  validates :username, presence: true,
    format: { with: /\A(?=.*[a-z])[a-z\d]+\Z/i },
    uniqueness: { case_sensitive: false }
end

# class Honey < ApplicationRecord
#   belongs_to :user, :class_name => "User"
#   belongs_to :honey, :class_name => "User"
# end